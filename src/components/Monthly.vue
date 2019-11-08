<template>
  <v-container>
    <h1>Monthly</h1>
    <h3>{{monthlyData}}</h3>
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
        "http://www.londonprayertimes.com/api/times/?format=json&24hours=true&year=2019&month=November&key=ae900935-5768-40a8-9155-5fa95c6d6e89"
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