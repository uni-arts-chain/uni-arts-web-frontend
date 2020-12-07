const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    chainWebpack: (config) => {
        config.plugin("html").tap((options) => {
            options[0].title = process.env.VUE_APP_NAME;
            return options;
        });
        config.module
            .rule("svg")
            .exclude.add(resolve("src/assets/icons"))
            .end();
        config.module
            .rule("svgSpriteLoader")
            .test(/\.svg$/)
            .include.add(resolve("src/assets/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            })
            .end();
    },
    devServer: {
        port: 5100,
        proxy: {
            "/test/api": {
                target: "http://service.uniarts.me", // 接口的域名 测试
                pathRewrite: {
                    "^/test/api": "/api",
                },
            },
            "/api": {
                target: "http://service.uniarts.me", // 接口的域名 测试
                pathRewrite: {
                    "^api": "/api",
                },
            },
        },
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/var.scss";`,
            },
        },
    },
};
