import rpcConfig from "./rpc";

export const NODE_ENV = process.env.NODE_ENV || "development";

// HTTP_API 默认配置
export const HTTP_DEFAULT_CONFIG = {
    baseURL: "/api/v1", // baseUrl
    isProd: NODE_ENV === "production" ? true : false, // true：访问测试接口  false: 访问线上接口
    debug: NODE_ENV === "production" ? false : true,
};

// 路由默认配置，路由表并不从此注入
export const ROUTER_DEFAULT_CONFIG = {
    // waitForData: true,
    // transitionOnLoad: true,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    mode: "history",
    base: "",
};

export const CHAIN_DEFAULT_CONFIG = {
    url: "192.168.0.128",
    port: "9944",
    dappName: "Uni-Arts",
};

export const RPC_DEFAULT_CONFIG = rpcConfig;
