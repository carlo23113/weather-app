import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        light: {
          colors: {
            primary: "#1867C0",
            secondary: "#5CBBF6",
            primaryBgColor: "fafafa",
          },
        },
        dark: {
          colors: {
            background: "#0F0E0E",
            primary: "#1867C0",
            secondary: "#5CBBF6",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
