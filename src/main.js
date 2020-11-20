import Vue from "vue";
import App from "@/views/App.vue";
import router from "@/plugins/router";
import store from "@/store/index";
import inject from "@/inject/index";

import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(inject);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
