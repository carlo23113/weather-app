import { City, Weather } from "./../types/weather";
import { Headers } from "@/types/index";
import { defineStore } from "pinia";
import axios from "axios";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    city: null as City | null,
    weather: [] as Weather[],
    headers: headers as Headers[],
    mobileHeaders: mobileHeaders as Headers[],
  }),
  actions: {
    async searchCity(search: string) {
      const nuxtConfig = useRuntimeConfig();

      const config = {
        method: "get",
        url:
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
          search +
          "&appid=" +
          nuxtConfig.public.WEATHER_API_KEY,
        headers: {},
      };
      return await axios(config)
        .then((response) => {
          let list = response.data.list;
          let weatherList: Weather[] = [];
          const city = response.data.city;

          list.map((list: any) => {
            weatherList.push({
              date: new Date(list.dt_txt).toLocaleDateString(),
              temp: list.main.temp,
              description: list.weather[0].description,
              main: list.weather[0].main,
              pressure: list.main.pressure,
              humidity: list.main.humidity,
            });
          });
          return [city, weatherList];
        })
        .catch((error) => {
          console.log(error);
          return Promise.reject(error);
        });
    },
  },
  getters: {},
});

const headers: Headers[] = [
  {
    label: "Date (mm/dd/yyyy)",
    value: "date",
  },
  {
    label: "Temp (F)",
    value: "temp",
  },
  {
    label: "Description",
    value: "description",
  },
  {
    label: "Main",
    value: "main",
  },
  {
    label: "Pressure",
    value: "pressure",
  },
  {
    label: "Humidity",
    value: "humidity",
  },
];

const mobileHeaders: Headers[] = [
  {
    label: "Date (mm/dd/yyyy)",
    value: "date",
  },
  {
    label: "Temperature (F)",
    value: "temp",
  },
];
