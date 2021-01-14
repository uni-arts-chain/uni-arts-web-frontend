import http from "@/plugins/http";

export default {
    namespaced: true,
    state: {
        categories: [],
        themes: [],
        materials: [],

        ART_OFFLINE: 1,
        ART_ONLINE: 2,
        ART_ON_AUCTION: 3,
        ART_WAITING_AUCTION: 4,
        ART_ON_SALE: 5,
        ART_AUCTIONED: 6,
    },
    mutations: {
        SET_CATEGORIES: (state, data) => {
            state.categories = data;
        },
        SET_THEMES: (state, data) => {
            state.themes = data;
        },
        SET_MATERIALS: (state, data) => {
            state.materials = data;
        },
    },
    actions: {
        GetCategories({ commit }) {
            http.globalGetCategories({}).then((data) => {
                commit("SET_CATEGORIES", data);
            });
        },
        GetThemes({ commit }) {
            http.globalGetThemes({}).then((data) => {
                commit("SET_THEMES", data);
            });
        },
        GetMaterials({ commit }) {
            http.globalGetMaterials({}).then((data) => {
                commit("SET_MATERIALS", data);
            });
        },
        SetCategory({ commit }, data) {
            commit("SET_CATEGORIES", data);
        },
        SetThemes({ commit }, data) {
            commit("SET_THEMES", data);
        },
        SetMaterials({ commit }, data) {
            commit("SET_MATERIALS", data);
        },
    },
};
