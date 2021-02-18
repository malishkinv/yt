import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import ApiService from "@/services/api.service";
import Layout from "@/layouts/Layout.vue";

Vue.component("layout", Layout);

ApiService.init(process.env.VUE_APP_ROOT_API);
ApiService.mountErrorsInterceptor();

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");