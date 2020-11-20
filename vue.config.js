// const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    chainWebpack: (config) => {
        config.plugin("html").tap((options) => {
            options[0].title = process.env.VUE_APP_NAME;
            return options;
        });
    },
    devServer: {
        port: 5100,
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/var.scss";`,
            },
        },
    },
};
