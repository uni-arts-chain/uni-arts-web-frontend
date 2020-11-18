module.exports = {
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
