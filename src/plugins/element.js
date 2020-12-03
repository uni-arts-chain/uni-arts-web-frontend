import { Notification } from "element-ui";

export default {
    install: (vue) => {
        vue.prototype.$notify = Notification;
    },
};
