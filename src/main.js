import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

import "./assets/styles/index.css";

import router from "./router";
import store from "./store";

import VueBarcode from "@chenfengyuan/vue-barcode";

Vue.component(VueBarcode.name, VueBarcode);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
