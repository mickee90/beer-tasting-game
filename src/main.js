import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

import "./assets/styles/index.css";

import router from "./router";
import store from "./store";

import VueBarcode from "@chenfengyuan/vue-barcode";
import Clipboard from "v-clipboard";

Vue.component(VueBarcode.name, VueBarcode);

Vue.config.productionTip = false;

Vue.use(Clipboard);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
