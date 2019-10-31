import Vue from "vue";
import VueRouter from "vue-router";
import Prayer from "../components/Prayer";

Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Prayer",
      component: Prayer
    }
  ]
});
