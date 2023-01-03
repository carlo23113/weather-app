import { NavLink } from "@/types/layout";
import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", {
  state: () => ({
    navLinks: navLinks as Array<NavLink>,
    sidebar: false as boolean,
  }),
  actions: {},
  getters: {},
});

const navLinks: Array<NavLink> = [
  {
    icon: "mdi-home",
    route: "/",
    title: "Home",
  },
  {
    icon: "mdi-cloud",
    route: "/weather",
    title: "Weather",
  },
];
