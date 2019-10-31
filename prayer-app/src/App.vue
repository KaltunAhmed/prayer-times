<template>
  <v-app>
    <router-view>
      <Prayer />
    </router-view>
  </v-app>
</template>

<script>
import Prayer from "./components/Prayer";

export default {
  name: "App",
  components: {
    Prayer
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
