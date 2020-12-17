import { Notification, Loading } from "element-ui";

export default {
    install: (vue) => {
        vue.use(Loading.directive);
        vue.prototype.$notify = Notification;
    },
};
