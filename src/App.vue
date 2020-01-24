<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
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
