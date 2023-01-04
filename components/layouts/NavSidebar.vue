<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    :rail="sidebar"
    :permanent="sidebarPermanent"
    border="none"
    width="270"
    color="#FFFFFF"
  >
    <div id="logo-container">
      <v-btn icon size="small" elevation="0" @click="toggleSidebar()">
        <v-icon size="x-large">mdi-menu</v-icon>
      </v-btn>
      <div>
        <img id="logo" :src="logo" />
        <span>Weather Forecast</span>
      </div>
    </div>

    <v-list density="compact" color="primary" nav>
      <v-list-subheader>Menu</v-list-subheader>
      <div v-for="(nav, i) in navLinks" :key="i">
        <v-list-item
          :prepend-icon="nav.icon"
          :title="nav.title"
          :to="nav.route"
          @click.stop="$emit('click', nav)"
        >
        </v-list-item>
      </div>
      <v-list-item
        prepend-icon="mdi-logout"
        title="Log Out"
        style="margin-top: auto"
        @click="logout()"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onMounted } from "vue";
import { NavLink } from "@/types/layout";
import { useRouter } from "vue-router";
import { useLayoutStore } from "~~/stores/layout";
import { storeToRefs } from "pinia";
import logo from "@/assets/images/logo.png";
import axios from "axios"

export default defineComponent({
  name: "nav-sidebar",
});
</script>

<script setup lang="ts">
defineProps({
  navLinks: {
    type: Array<NavLink>,
    required: true,
  },
});

const layoutStore = useLayoutStore();
const router = useRouter();
const { sidebar, sidebarPermanent, drawer, isMobileView } =
  storeToRefs(layoutStore);

onMounted(() => {
  nextTick(() => {
    window.addEventListener("resize", () => {
      if (window.outerWidth < 493) {
        sidebarPermanent.value = false;
        sidebar.value = false;
        isMobileView.value = true;
      } else {
        sidebarPermanent.value = true;
        sidebar.value = true;
        isMobileView.value = false;
      }
    });
  });
});

const toggleSidebar = () => {
  if (!isMobileView.value) {
    sidebar.value = !sidebar.value;
  } else {
    drawer.value = !drawer.value;
  }
};

const logout = () => {
  const config = {
    method: "post",
    url: "http://127.0.0.1:8000/api/auth/logout",
    headers: {
      Authorization:
        "bearer " + localStorage.getItem('token'),
    },
  };
  axios(config)
    .then((response: any) => {
        return navigateTo("/login");
    })
    .catch((error) => {
      console.log(error);
      return navigateTo("/login");
    });
};
</script>

<style lang="scss" scoped>
#logo-container {
  display: flex;
  align-items: center;
  padding: 0.5rem 0 0 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    #logo {
      max-width: 40%;
      max-height: 2rem;
      margin-left: 1.5rem;
    }

    span {
      font-size: 0.9em;
      font-weight: 600;
    }
  }
}
</style>
