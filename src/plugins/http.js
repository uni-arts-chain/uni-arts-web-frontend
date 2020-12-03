import axios from "@/plugins/axios";
import _assign from "lodash/assign";
import API from "@/api/index";

import { assert } from "@polkadot/util";
import { HTTP_DEFAULT_CONFIG } from "@/config";

function _normoalize(options, data) {
    if (options.method === "POST") {
        options.data = data;
    } else if (options.method === "GET" || options.method === "DELETE") {
        options.params = data;
    }
    return options;
}

function _firstUpperCase(str) {
    return str.replace(/\b(\w)/g, function ($1) {
        return $1.toUpperCase();
    });
}

export class MakeApi {
    request;

    constructor(options) {
        this.request = {};
        this.builder(options);
    }
    builder(options) {
        Object.keys(options.apiModules).forEach((namespace) => {
            this.apiBuilder({
                api: options.apiModules[namespace],
                namespace,
                config: options.config,
            });
        });
    }
    apiBuilder(options) {
        options.api.forEach((api) => {
            const apiName = `${options.namespace}${_firstUpperCase(api.name)}`,
                url = api.path;

            api.baseUrl = api.baseUrl ? api.baseUrl : options.config.baseURL;
            api.baseUrl = options.config.isProd
                ? api.baseUrl
                : `/test${api.baseUrl}`;
            options.config.debug &&
                assert(api.name, `${url} :接口name属性不能为空`);
            options.config.debug &&
                assert(
                    url.indexOf("/") === 0,
                    `${url} :接口路径path，首字符应为/`
                );
            Object.defineProperty(this.request, apiName, {
                value(outerParams, outerOptions) {
                    let _data = outerParams;
                    if (api.method == "POST") {
                        if (api.options && !api.options.unSignature) {
                            api.options.paramsObj = outerParams;
                        }
                        const formData = new FormData();
                        Object.keys(outerParams).forEach((v) => {
                            formData.append(v, outerParams[v]);
                        });
                        _data = formData;
                    }
                    const obj = {
                        url: url,
                        method: api.method,
                    };
                    console.log("api.baseUrl: ", api.baseUrl);
                    api.baseUrl && (obj["baseURL"] = api.baseUrl);
                    return axios(
                        _normoalize(
                            _assign(obj, _assign({}, outerOptions)),
                            _data
                        )
                    );
                },
            });
        });
    }
}

export default new MakeApi({
    apiModules: API,
    config: HTTP_DEFAULT_CONFIG,
}).request;
