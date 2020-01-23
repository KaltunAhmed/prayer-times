<template>
  <div :class="{ 'active' : active }">
    <div>
      <button @click="active=!active" class="open-button">
        <v-icon class="exit" v-if="active">fa fa-times</v-icon>
      </button>
    </div>
    <button @click="active=!active" class="close-button">
      <v-icon class="exit" v-if="!active">fa fa-bars</v-icon>
    </button>
  </div>
</template>
<script>
export default {
  name: "NavBar",

  data() {
    return {
      active: false
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
.open {
  color: rgb(223, 219, 219);
}
.open-button {
  cursor: pointer;
  float: right;
  margin-right: 20px;
}
.theme--light.v-icon {
  color: unset;
}
.close-button {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}
.active {
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
  width: 100%;
  transition: 0.5s;
  background: #38404c;
}
.active ::after {
  transition: 0.5s;
}
.exit {
  cursor: pointer;
  display: flex;
  margin-left: 16%;
  margin-top: 2%;
}
</style>