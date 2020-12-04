import http from "@/plugins/http";

export default {
    namespaced: true,
    state: {
        categories: [],
        themes: [],
        materials: [],
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
