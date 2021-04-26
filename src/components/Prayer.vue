<template>
  <div>
    <v-container>
      <div class="times">
        <div class="header-img">
          <img src="../assets/prayer-img.png" class="logo-img" />
        </div>
        <span v-show="requestError" id="error">
          {{errorMessage}} &#x1F62C;  <!-- &#x1F62C = grimacing face -->
        </span>
        <div class="searchBar">
          <b-field >
            <b-autocomplete
                rounded
                v-model="cityInput"
                :data="matchingCities"
                placeholder="Enter name of your city and select"
                icon="magnify"
                clearable
                check-infinite-scroll
                @select=" option => (res = option.split(', '), city=res[0], state=res[1], country=res[2], getPrayerTimes() )"
                
                >
                <template #empty>City not found</template>
            </b-autocomplete>
          </b-field>
        </div>
        <div v-if="locationDetermined" >
          <h1>{{ city }}</h1>
          <h1>{{ wholeResponse.data.date.gregorian.date}}</h1>
          <h4>Fajr: {{ wholeResponse.data.timings.Fajr }}</h4>
          <h4 class="sunrise">Sunrise: {{ this.wholeResponse.data.timings.Sunrise }}</h4>
          <h4>Dhuhr: {{ wholeResponse.data.timings.Dhuhr }}</h4>
          <h4>Asr: {{ wholeResponse.data.timings.Asr }}</h4>
          <h4 class="sunset">Maghrib: {{ wholeResponse.data.timings.Maghrib }}</h4>
          <h4>Isha: {{ wholeResponse.data.timings.Isha }}</h4>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
/* eslint no-console: "warn" */
/*eslint no-inner-declarations: "off"*/
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      wholeResponse: [],
      loading: true,
      city: '',
      state: '',
      country: '',
      locationDetermined: false,
      requestError: false,
      errorMessage: 'Failed to Get Prayer Times',

      cityInput: '',
      cities: [],
      previousCity:''
    };
  },

  watch: {
    // whenever input changes, this function will run
    cityInput: function (newCity, oldCity) {
      newCity+oldCity; //to bypass 'no-unused-variables' error
      newCity==""?this.cities=[]:this.updateCities(newCity);
    }
  },

  mounted() {
    // enable checks for query parameters
    // this would allow bookmarking prayer locations
    // e.g. https://host/#/?city=london&country=GB
    this.$route.query.city ? this.city = this.$route.query.city : '';
    this.$route.query.state ? this.state = this.$route.query.state : '';
    this.$route.query.country ? this.country = this.$route.query.country : '';

    if (this.city && this.country) { // min of city and country is required to get prayer times
      this.getPrayerTimes({ method: 'city-state-country'});
    } else if (navigator) {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

        // Save a ref to `this` because the context changes within success callback
        const self = this;

        function success(pos) {
          const crd = pos.coords;
          const { longitude, latitude } = crd
          self.getPrayerTimes({ method: 'coordinates', longitude, latitude });
        }

        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        // request location through the browser (we never store this, just pass it to the API)
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
  },
  methods: {
  async getPrayerTimes (config = { method: 'city-state-country' }) {
    let response;
    let apiUrl="https://api.aladhan.com/v1";
    let queryString = "?"

    if (config.method === 'coordinates'){
      queryString += `latitude=${config.latitude}&longitude=${config.longitude}`
      apiUrl += `/timings${queryString}`
    } else if (config.method === 'city-state-country') {
      queryString += `city=${this.city}&state=${this.state}&country=${this.country}`
      apiUrl += `/timingsByCity${queryString}`
    }

    try {
      response = await axios.get(`${apiUrl}`);
      this.wholeResponse = response.data;
      this.locationDetermined = true;
      this.requestError = false;

      this.previousCity = this.city;
      this.cityInput = '';

    } catch(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error with the response: ', error.response);
          this.errorMessage = error.response.data.data;
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error('Error with the request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
        }
        this.city = this.previousCity; //ensures city matches displayed timetable
        this.requestError = true; // displays error message
      }
    },

    async updateCities(newCity){
       await axios.get(`https://api.teleport.org/api/cities/?search=${newCity}`)
        .then((response)=>{this.cities=response.data._embedded[`city:search-results`]})
        .catch((err)=>{console.log(err)});
      
    }
  },
  computed: {
    matchingCities() {
      return this.cities.map(c => c.matching_full_name);
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
input[type=text] {
  text-align: center;
  color: white;
  margin-bottom: 10px;
  width:300px;
}
span {
  color: gold;
  margin-bottom: 20px;
}

.searchBar {
  width:400px;
  margin:0 auto;
}
</style>
