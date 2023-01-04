<template>
  <div>
    <div v-if="city">
      <div id="city">
        {{ city.name + ", " + city.country }}
      </div>

      <table-component
        id="desktop-table"
        :headers="headers"
        :data="data"
      ></table-component>
      
      <table-component
        id="mobile-table"
        :headers="mobileHeaders"
        :data="data"
      ></table-component>

      <v-pagination
        class="mt-2"
        v-model="page"
        rounded="circle"
        size="small"
        :length="paginationLength"
        @update:model-value="paginate()"
      ></v-pagination>
    </div>
    <div v-else id="no-data-container">
      <div id="no-data">
        <img id="svg" src="@/assets/svg/no-data.svg" />
        <div id="no-data-text">No Data</div>
        <v-btn color="primary" variant="text" to="/">Go to home</v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useWeatherStore } from "~~/stores/weather";
import { storeToRefs } from "pinia";
import { Table as TableComponent } from "~~/components/common";

export default defineComponent({
  name: "weather-page",
});
</script>

<script setup lang="ts">
const weatherStore = useWeatherStore();
const { city, weather, headers, mobileHeaders } = storeToRefs(weatherStore);
const page = ref(1);
const data: any = ref([]);
const paginationLength = weather.value.length / 10;

definePageMeta({
});

onMounted(() => {
  paginate();
});

const paginate = () => {
  data.value = weather.value.slice((page.value - 1) * 10, page.value * 10);
};
</script>

<style scoped lang="scss">
#city {
  font-weight: 600;
  font-size: 1.5em;
  margin-bottom: 1rem;
}

#mobile-table {
  display: none;
}

#no-data-container {
  height: 80vh;
  display: grid;
  place-items: center;

  #no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #svg {
    width: 15rem;
  }

  #no-data-text {
    font-size: 2.5em;
    font-weight: bold;
    text-align: center;
    color: rgb(67, 67, 67);
  }
}

@media (max-width: 426px) {
  #desktop-table {
    display: none;
  }
  #mobile-table {
    display: block;
  }
}
</style>
