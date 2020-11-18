import axios from "@/plugins/axios";

function _isJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export function requestSuccessFunc(config) {
    const languageStr = "en";
    config.headers["Accept-Language"] = languageStr;
    return config;
}

export function requestFailFunc(requestError) {
    return Promise.reject(requestError);
}

export function responseSuccessFunc(responseObj) {
    return Promise.resolve(responseObj.data);
}

export function responseFailFunc(responseError) {
    if (responseError.response) {
        if (responseError.response.status == 404) {
            return Promise.reject(responseError.response.data);
        }
        if (responseError.response.status == 503) {
            return Promise.reject(responseError.response.data);
        }
        if (responseError.response.status >= 500) {
            return Promise.reject("服务器未知错误，请稍后重试");
        }
        return Promise.reject(responseError);
    } else {
        if (
            responseError.code === "ECONNABORTED" &&
            responseError.config.method === "get"
        ) {
            // 请求超时了
            const config = responseError.config;
            // 配置不存在或者未设置retry属性
            if (!config || !config.retry) return Promise.reject(responseError);

            // 设置已经重新请求次数的变量以便下次判断
            config.__retryCount = config.__retryCount || 0;

            // 检查再次请求次数是否超过设定
            if (config.__retryCount >= config.retry) {
                // 超时次数超过设定
                console.log("请求超时，已多次尝试链接");
                return Promise.reject(responseError);
            }

            // 增加再次请求计数
            config.__retryCount += 1;

            // 创建promise延时处理再次请求
            const backoff = new Promise(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, config.retryDelay || 1);
            });

            // 返回一个其中包含了再次请求的promise，
            return backoff.then(function () {
                // url会因为baseURL不停的叠加
                config.url = config.url.replace(config.baseURL, "");
                if (_isJSON(config.data)) {
                    // axios默认会把data JSON化，重新请求时会导致签名算法读取的是字符串，导致出错
                    config.data = JSON.parse(config.data);
                }
                return axios(config);
            });
        }
        return Promise.reject(responseError);
    }
}
