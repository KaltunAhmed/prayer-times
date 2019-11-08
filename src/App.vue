<template>
  <v-app>
    <router-view><Prayer /></router-view>
    <!-- <router-view><Monthly /></router-view> -->
  </v-app>
</template>

<script>
import Prayer from "./components/Prayer";
// import Monthly from "./components/Monthly";

export default {
  name: "App",
  components: {
    Prayer,
    // Monthly
  },
  data: () => ({
    //
  })
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Staatliches&display=swap");
.v-application--wrap {
  background: #000e20;
  color: lightgrey;
  font-family: "Staatliches", cursive;
}
</style>
