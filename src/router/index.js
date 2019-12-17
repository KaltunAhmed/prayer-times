import Vue from "vue";
import VueRouter from "vue-router";
import Prayer from "../components/Prayer";
import Monthly from "../components/Monthly";

Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Prayer",
      component: Prayer
    },
    {
      path: "/monthly",
      name: "Monthly",
      component: Monthly
    },

  ]
});
