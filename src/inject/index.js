import dialog from "@/plugins/dialog";

export default {
    install: (vue) => {
        vue.prototype.$unidDialog = dialog;
    },
};
