import Vue from "vue";
import App from "./views/Main.vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);
import routes from "./routes";

import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);

import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy);

const router = new VueRouter({
  routes,
  mode: "history",
  base: "/",
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
