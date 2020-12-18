import { Notification, Loading, Breadcrumb, BreadcrumbItem } from "element-ui";

export default {
    install: (vue) => {
        vue.use(Loading.directive);
        vue.use(Breadcrumb);
        vue.use(BreadcrumbItem);

        vue.prototype.$notify = Notification;
    },
};
