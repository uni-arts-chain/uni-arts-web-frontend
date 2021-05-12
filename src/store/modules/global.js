export default {
    namespaced: true,
    state: {
        lang: "en",
        theme: "light",
        chain: {
            genesisHash: "",
            specVersion: "",
            ss58Format: "",
            tokenDecimals: "",
            tokenSymbol: "",
            blockHeight: "",
            timestamp: "",
        },
        symbol: "UART",
        currencyId: {
            Native: "Null",
        },
    },
    mutations: {
        SET_CHAIN(state, data) {
            state.chain = data;
        },
        SET_THEME(state, theme) {
            state.theme = theme;
        },
    },
    actions: {
        SetChain({ commit }, data) {
            commit("SET_CHAIN", data);
        },
        SetTheme({ commit }, theme) {
            commit("SET_THEME", theme);
        },
    },
};
