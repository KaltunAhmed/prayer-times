<template>
  <div class="prayer" :style=" this.cssVars ">
    <img alt="prayer icon" class="prayer__logo" :src="`${icons[name]} `" />
    <p class="prayer__time">{{ time }}</p>
    <p class="prayer__name">{{name}}</p>
  </div>
</template>

<script>
export default {
  name: "prayer",
  props: ["name", "time"],

  data() {
    return {
      icons: {
        Fajr: "https://th.bing.com/th/id/OIP.1n1Rv7qNDGqVrc0SLZk9egHaHa?pid=ImgDet&rs=1",
        Dhuha: "https://cdn0.iconfinder.com/data/icons/weather-406/24/weather-afternoon-day-time-pm-128.png",
        Ishraq: "https://cdn0.iconfinder.com/data/icons/weather-406/24/weather-afternoon-day-time-pm-128.png",
        Dhuhr: "https://cdn3.iconfinder.com/data/icons/space-lineal-color-set/512/Sun-512.png",
        Asr: "https://cdn0.iconfinder.com/data/icons/weather-406/24/morning-day-time-weather-512.png",
        Maghrib: "https://image.flaticon.com/icons/png/512/856/856329.png",
        Isha: "https://media.istockphoto.com/vectors/cloudy-night-icon-white-weather-icon-vector-id1131028105?k=6&m=1131028105&s=612x612&w=0&h=vThX-bgrpfTQfkbsKgS7Fp-u12WkJdoeYm1eN_mtiUc=",
      },
    };
  }
};
</script>

<style scoped>

.prayer {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  background: rgba(11, 4, 114, 0.815);
  width: 50vh;
  border-radius: 12px;
  overflow: hidden;
  margin: 2%;
  position: relative;
}
.prayer__logo {
  width: 100px;
  border-radius: 12px 0 0 12px;
  background: darkcyan;
}
.prayer__time {
  width: 100%;
  font-size: 60px;
  text-align: center;
  width: 100%;
  align-self: center;
  padding: 0%;
  margin: 0;
}
.prayer__name {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    color:orange;
    padding: 2%;
    text-align:right
    /* background:rebeccapurple; */
}
</style>