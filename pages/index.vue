<template>
  <div style="height: 70vh">
    <v-row>
      <v-col cols="12">
        <small>Github Link: <a target="_blank" :href="user.url">{{ user.url }}</a></small>
      </v-col>
      <v-col cols="12" lg="4">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          v-model="search"
          label="Search your city..."
          color="primary"
          :loading="loading"
          variant="solo"
        ></v-text-field>
      </v-col>
    </v-row>

    <div id="city-container">
      <div v-if="!notFound && !city" id="not-found">
        <img id="svg" src="@/assets/svg/search.svg" />
        <div id="not-found-text">Search City</div>
      </div>
      <div v-if="notFound" id="not-found">
        <img id="svg" src="@/assets/svg/empty.svg" />
        <div id="not-found-text">No Results Found</div>
      </div>
      <v-row v-else-if="!notFound && city">
        <v-col cols="12" lg="4"
          ><v-card
            ><v-card-title
              ><v-icon class="mr-1" color="red" size="small"
                >mdi-map-marker</v-icon
              >{{ city.name + ", " + city.country }}</v-card-title
            >
            <v-card-text>
              <v-btn
                color="primary"
                flat
                size="small"
                class="mt-4"
                to="/weather"
                >Display Weather</v-btn
              >
            </v-card-text></v-card
          >
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from "vue";
import { useWeatherStore } from "@/stores/weather";
import { useAuthStore } from "~~/stores/auth";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "home-page",
});
</script>

<script setup lang="ts">
const weatherStore = useWeatherStore();
const authStore = useAuthStore();

const search = ref("");
const loading = ref(false);
const awaitingSearch = ref(false);
const notFound = ref(false);

const { city, weather } = storeToRefs(weatherStore);
const { user } = storeToRefs(authStore);

watch(search, () => {
  if (!awaitingSearch.value && search.value.length > 0) {
    setTimeout(() => {
      searchCity();
      awaitingSearch.value = false;
    }, 1500);
    awaitingSearch.value = true;
  }
});

onMounted(() => {
  const tokenParams = window.location.search.split("token=")[1];
  if (tokenParams) {
    localStorage.setItem("token", tokenParams);
  }

  const result = authStore.getUser();
  result.then((data) => {
    user.value = data;
  }).catch((error) => {
    console.log(error);
  });
});

const searchCity = () => {
  loading.value = true;
  notFound.value = false;

  weatherStore
    .searchCity(search.value)
    .then((response: any) => {
      city.value = response[0];
      weather.value = response[1];
    })
    .catch((error) => {
      console.log(error);
      city.value = null;
      weather.value = [];
      notFound.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style scoped lang="scss">
#city-container {
  height: 100%;
  display: grid;
  padding: 1rem 0;
}

#not-found {
  color: rgb(99, 99, 99);
  font-weight: bolder;
  font-size: 1.5em;
  display: grid;
  place-content: center;

  #svg {
    width: 15rem;
  }

  #not-found-text {
    font-size: 1em;
    font-weight: bold;
    text-align: center;
    color: rgb(67, 67, 67);
    margin-top: 1rem;
  }
}
</style>
