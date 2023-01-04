import { User } from './../types/index';
import { defineStore } from "pinia";
import axios from "axios";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    user: {} as User | void,
    nuxtConfig: useRuntimeConfig(),
  }),
  actions: {
    async getUser() {
      const config = {
        method: "post",
        url: this.nuxtConfig.public.apiBase + "/auth/getUser",
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      };
      return await axios(config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async logout() {
      const config = {
        method: "post",
        url: this.nuxtConfig.public.apiBase + "/auth/logout",
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      };
      return await axios(config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {},
});
