<template>
  <div :class="{ 'active' : active }">
    <div class="exit">
      <button @click="toggleNav()">
        <v-icon>fa fa-times</v-icon>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavBar",

  data() {
    return {
      active: true
    };
  },
  methods: {
    toggleNav() {
      this.active = !this.active;
    }
  }
};
</script>
<style>
.active {
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
  width: 20%;
  background: #38404c;
}
.exit {
  position: absolute;
  right: 26px;
  font-size: 36px;
  margin-left: 50px;
  top: 12px;
}
</style>