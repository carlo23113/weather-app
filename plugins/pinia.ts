import { createPinia, PiniaVuePlugin } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();

  nuxtApp.vueApp.use(PiniaVuePlugin);
  nuxtApp.vueApp.use(pinia);
});
