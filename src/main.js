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

// import VueApollo from "vue-apollo";

// import ApolloClient from "apollo-client";
// import { HttpLink } from "apollo-link-http";
// import { InMemoryCache } from "apollo-cache-inmemory";

// const getHeaders = () => {
//   const headers = {};
//   const token = window.localStorage.getItem("apollo-token");
//   if (token) {
//     headers.authorization = `Bearer ${token}`;
//   }
//   return headers;
// };

// const link = new HttpLink({
//   uri: "https://beer-tasting-game.herokuapp.com/v1/graphql",
//   fetch,
//   headers: getHeaders()
// });

// const client = new ApolloClient({
//   link: link,
//   cache: new InMemoryCache({
//     addTypename: true
//   })
// });

// const apolloProvider = new VueApollo({
//   defaultClient: client
// });

Vue.use(VueCarousel);
Vue.component(VueBarcode.name, VueBarcode);

Vue.config.productionTip = false;

Vue.use(Clipboard);
// Vue.use(VueApollo);

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
