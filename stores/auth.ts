import { User } from './../types/index';
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    user: {} as User | void,
  }),
  actions: {
    async getUser() {
      const config = {
        method: "post",
        url: "http://127.0.0.1:8000/api/auth/getUser",
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
