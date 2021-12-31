<template>
  <div>
    <v-container>
      <div class="times">
        <div class="header-img">
          <img src="../assets/prayer-img.png" class="logo-img" />
        </div>
        <span v-show="requestError" id="error">
          {{ errorMessage }} &#x1F62C;
          <!-- &#x1F62C = grimacing face -->
        </span>
        <div class="searchBar">
          <b-field>
            <v-autocomplete
              v-model="previousCity"
              :items="matchingCities"
              :loading="loading"
              color="blue"
              :search-input.sync="cityInput"
              hide-no-data
              hide-selected
              item-text="matching_full_name"
              item-value="matching_full_name"
              label="Your City:"
              placeholder="e.g. San Antonio"
              prepend-icon="mdi-city"
              dark
              filled
              chip
              dense
              chips
              deletable-chips
              return-object
            >
            </v-autocomplete>
          </b-field>
        </div>
        <v-container class="py-0">
          <v-row align="center" justify="start">
            <v-col
              v-for="(selection, i) in selectedCities"
              :key="selection.city + i"
              class="shrink"
            >
              <v-chip-group
                :mandatory="true"
                :column="true"
                active-class="secondary--text"
              >
                <v-chip
                  :disabled="loading"
                  close
                  outlined
                  :color="selectedCity(selection.city)"
                  @click:close="selectedCities.splice(i, 1)"
                  @click="previousCity = selection.city_full_name"
                >
                  {{ selection.city }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-if="locationDetermined">
        <h1>{{ city }}</h1><h4 style="">{{ wholeResponse.data.date.gregorian.date }}</h4>
        <div class="prayer__times" >
          <prayer name="Fajr" :time="wholeResponse.data.timings.Fajr"></prayer>
          <prayer name="Ishraq" :time="wholeResponse.data.timings.Sunrise"></prayer>
          <prayer name="Dhuhr" :time="wholeResponse.data.timings.Dhuhr"></prayer>
          <prayer name="Asr" :time="wholeResponse.data.timings.Asr"></prayer>
          <prayer name="Maghrib" :time="wholeResponse.data.timings.Maghrib" ></prayer>
          <prayer name="Isha" :time="wholeResponse.data.timings.Isha"></prayer>
        </div>
        </v-container>
      </div>
    </v-container>
  </div>
</template>

<script>
/* eslint no-console: "warn" */
/*eslint no-inner-declarations: "off"*/
import axios from "axios";
import prayer from "./PrayerTimeCard.vue";

export default {
  components: { prayer },
  data() {
    return {
      wholeResponse: [],
      loading: true,
      city: "",
      state: "",
      country: "",
      locationDetermined: false,
      requestError: false,
      errorMessage: "Failed to Get Prayer Times",

      cityInput: "",
      cities: [],
      previousCity: "",
      selectedCities: [],
      // mandatory: false
    };
  },

  watch: {
    // whenever input changes, this function will run to update the autocomplete
    cityInput: function (newCity) {
      newCity == "" ? (this.cities = []) : this.updateCities(newCity);
    },
    //whenever previous city changes (i.e. new city selected), this function will trigger fetch prayer times
    previousCity: function (prevCity) {
      if (!prevCity.includes(", ")) return;
      const res = prevCity.split(", ");
      this.city = res[0];
      this.state = res[1];
      this.country = res[2];
      this.getPrayerTimes();
    },
  },

  mounted() {
    // enable checks for query parameters
    // this would allow bookmarking prayer locations
    // e.g. https://host/#/?city=london&country=GB
    this.$route.query.city ? (this.city = this.$route.query.city) : "";
    this.$route.query.state ? (this.state = this.$route.query.state) : "";
    this.$route.query.country ? (this.country = this.$route.query.country) : "";

    if (this.city && this.country) {
      // min of city and country is required to get prayer times
      this.getPrayerTimes({ method: "city-state-country" });
    } else if (navigator) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      // Save a ref to `this` because the context changes within success callback
      const self = this;

      function success(pos) {
        const crd = pos.coords;
        const { longitude, latitude } = crd;
        self.getPrayerTimes({ method: "coordinates", longitude, latitude });
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      // request location through the browser (we never store this, just pass it to the API)
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  },

  methods: {
    async getPrayerTimes(config = { method: "city-state-country" }) {
      let response;
      let apiUrl = "https://api.aladhan.com/v1";
      let queryString = "?";

      if (config.method === "coordinates") {
        queryString += `latitude=${config.latitude}&longitude=${config.longitude}`;
        apiUrl += `/timings${queryString}`;
      } else if (config.method === "city-state-country") {
        queryString += `city=${this.city}&state=${this.state}&country=${this.country}`;
        apiUrl += `/timingsByCity${queryString}`;
      }

      try {
        response = await axios.get(`${apiUrl}`);
        this.wholeResponse = response.data;
        this.locationDetermined = true;
        this.requestError = false;

        this.previousCity = this.city;
        const chip = {
          city: this.previousCity,
          city_full_name: this.city + ", " + this.state + ", " + this.country,
        };

        //update selected cities, but keep to 4 items
        if (
          this.selectedCities
            .map((item) => item.city_full_name)
            .indexOf(chip.city_full_name) === -1
        ) {
          if (this.selectedCities.length >= 4) this.selectedCities.splice(0, 1);
          this.selectedCities.push(chip);
        }

      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error with the response: ", error.response);
          this.errorMessage = error.response.data.data;
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error("Error with the request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
        this.requestError = true; // displays error message
      }
    },

    async updateCities(newCity) {
      this.loading = true;
      await axios
        .get(`https://api.teleport.org/api/cities/?search=${newCity}`)
        .then((response) => {
          this.cities = response.data._embedded[`city:search-results`];
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //to colour-code the chips that highlight past cities
    selectedCity(selection) {
      return selection != this.city ? "grey" : "blue";
    },
  },
  computed: {
    matchingCities() {
      return this.cities.map((c) => c.matching_full_name);
    },
  },
};
</script>

<style scoped>
.prayer__times {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
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
input {
  text-align: center;
  color: rgb(190, 0, 0);
  margin-bottom: 10px;
  width: 300px;
}
span {
  color: gold;
  margin-bottom: 20px;
}

.searchBar {
  width: 400px;
  margin: 0 auto;
}
</style>
