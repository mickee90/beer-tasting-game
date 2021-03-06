import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import apolloProvider from "./apolloProvider";

import "./assets/styles/index.css";

// Globally register all `_base`-prefixed components
import "./components/_globals";

import router from "./router";
import store from "./store";

import VueBarcode from "@chenfengyuan/vue-barcode";
import VueCarousel from "@chenfengyuan/vue-carousel";
import Clipboard from "v-clipboard";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faAngleDoubleUp);
library.add(faAngleDoubleDown);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueCarousel);
Vue.component(VueBarcode.name, VueBarcode);

Vue.config.productionTip = false;

Vue.use(Clipboard);

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
