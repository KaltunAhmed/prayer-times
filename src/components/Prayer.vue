<template>
  <v-container>
    <div class="times">
      <!-- <h1>{{wholeResponse}}</h1> -->
      <h1>{{wholeResponse.city}}</h1>
      <h1>{{wholeResponse.date}}</h1>
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
export default {
  data() {
    return {
      wholeResponse: [],
      loading: true
    };
  },
  mounted() {
    axios
      .get(
        "http://www.londonprayertimes.com/api/times/?format=json&key=ae900935-5768-40a8-9155-5fa95c6d6e89"
      )
      .then(response => {
        this.wholeResponse = response.data;
        return this.wholeResponse;
      })
      .catch(error => {
        return error;
      });
  }
};
</script>

<style scoped>
.times {
  padding: 20px;
  margin: o auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 10%;
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
