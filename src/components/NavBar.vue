<template>
  <div>
    <button @click="active=!active" class="open-button">
      <v-icon class="exit" v-if="active">fa fa-times</v-icon>
    </button>
    <div class="static" :class="{ 'active' : active, 'close-div' :!active }">
      <div class="side-bar-backdrop">
        <transition name="slide">
          <div v-if="active" class="sidebar-panel">
            <div v-if="active" class="menu-items">
              <!-- list -->
              <ul>
                <li>
                  <v-icon>fa fa-star-and-crescent</v-icon>
                  <button>Calander</button>
                </li>
                <li>
                  <v-icon>fa fa-star-and-crescent</v-icon>
                  <button>Quran</button>
                </li>
                <li>
                  <button>Dua</button>
                </li>
              </ul>
            </div>
          </div>
        </transition>
        <!-- button -->
      </div>
      <!-- side bar backdrop -->
    </div>
    <button @click="active=!active" class="close-button" v-if="!active">
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
  z-index: 1;
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
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 250ms ease-in 0s;
}

.sidebar-panel {
  overflow-y: auto;
  background-color: #102235;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 999;
  padding: 3rem 20px 2rem 20px;
  width: 20%;
}

.exit {
  cursor: pointer;
  float: right;
  margin-right: 28px;
  margin-top: 14px;
}

.menu-items {
  display: flex;
  justify-content: center;
}
ul {
  list-style-type: none;
  text-align: center;
  margin-top: 5%;
}
li {
  font-size: 30px;
  margin-top: 20%;
}
li:hover {
  font-size: 35px;
  cursor: pointer;
}
.v-application ul {
  padding: unset;
}

@media only screen and (max-width: 740px) {
  .sidebar-panel {
    width: 50%;
  }
}
</style>