<template>
  <v-container>
    <NavBar></NavBar>

    <div class="times">
      <div class="header-img">
        <img src="../assets/prayer-img.png" class="logo-img" />
      </div>
      <!-- <h1>{{wholeResponse}}</h1> -->
      <h1>{{wholeResponse.city}}</h1>
      <h1>{{dateResponse.data}}</h1>
      <h4>Fajr: {{wholeResponse.fajr}}</h4>
      <h4 class="sunrise">Sunrise: {{wholeResponse.sunrise}}</h4>
      <h4>Dhuhr: {{wholeResponse.dhuhr}}</h4>
      <h4>Asr: {{wholeResponse.asr}}</h4>
      <h4 class="sunset">Magrib: {{wholeResponse.magrib}}</h4>
      <h4>Isha: {{wholeResponse.isha}}</h4>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import NavBar from "./NavBar";
export default {
  components: { NavBar },
  data() {
    return {
      wholeResponse: [],
      dateResponse: [],
      loading: true
    };
  },
  mounted() {
    axios
      .get(
        "https://www.londonprayertimes.com/api/times/?format=json&24hours=true&key=ae900935-5768-40a8-9155-5fa95c6d6e89"
      )
      .then(response => {
        this.wholeResponse = response.data;
        return this.wholeResponse;
      })
      .catch(error => {
        return error;
      });
    {
      axios
        .get("https://api.aladhan.com/v1/currentDate?zone=Europe/London")
        .then(dateResponse => {
          this.dateResponse = dateResponse.data;
          return this.dateResponse;
        })
        .catch(error => {
          return error;
        });
    }
  }
};
</script>

<style scoped>
.nav-bar {
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
  width: 20%;
}
.v-icon {
  color: white;
  text-align: center;
  margin-top: 20%;
  margin-left: 5%;
}
.logo-img {
  margin: 0 auto;
  display: flex;
  width: 20%;
}
@media only screen and (max-width: 740px) {
  .logo-img {
    width: 50%;
  }
}
.times {
  padding: 20px;
  margin: o auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  letter-spacing: 3px;
}
.sunrise {
  color: #f3eb83;
}
.sunset {
  color: #f79464;
}
h1 {
  font-size: 55px;
}
h4 {
  font-size: 30px;
}
</style>
