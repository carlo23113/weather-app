import { City, Weather } from "./../types/weather";
import { Headers } from "@/types/index";
import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    city: null as City | null,
    weather: [] as Weather[],
    headers: headers as Headers[],
    mobileHeaders: mobileHeaders as Headers[],
  }),
  actions: {},
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
