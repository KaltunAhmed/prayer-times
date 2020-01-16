<template>
  <v-container>
    <h3>Monthly</h3>
    <h3>{{monthlyData.data[1].meta.timezone}}</h3>
    <h5>{{monthlyData.data[1].date.readable}}</h5>
    <h5>Fajr: {{monthlyData.data[1].timings.Fajr}}</h5>
    <h5>Sunset: {{monthlyData.data[1].timings.Dhuhr}}</h5>
    <h5>Asr: {{monthlyData.data[1].timings.Asr}}</h5>
    <h5>Sunset: {{monthlyData.data[1].timings.Sunset}}</h5>
    <h5>Maghrib: {{monthlyData.data[1].timings.Maghrib}}</h5>
    <h5>Isha: {{monthlyData.data[1].timings.Isha}}</h5>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      monthlyData: [],
      loading: true
    };
  },
  mounted() {
    axios
      .get(
        "https://api.aladhan.com/v1/calendarByCity?city=London&country=United Kingdom&method=2&month=11&year=2019"
      )
      .then(response => {
        this.monthlyData = response.data;
        return this.monthlyData;
      })
      .catch(error => {
        return error;
      });
  }
};
</script>