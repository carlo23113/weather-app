<template>
  <v-app-bar
    :elevation="0"
    color="primaryBgColor"
  >
    <v-btn v-if="isMobileView" icon size="small" elevation="0" @click="toggleSidebar()">
      <v-icon size="x-large">mdi-menu</v-icon>
    </v-btn>
    <div id="app-bar">
      <page-title :current-title="currentTitle"></page-title>
      <v-btn variant="text" id="user" style="text-transform: capitalize" :href="user.url">
        <v-avatar class="mr-2" size="small">
          <v-img :src="user.avatar"></v-img>
        </v-avatar>
        {{ user ? user.name : 'Name'}}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageTitle from "@/components/layouts/PageTitle.vue";
import githubIcon from "@/assets/images/github-icon.png";
import { useLayoutStore } from "~~/stores/layout";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
 
export default defineComponent({
  name: "app-bar",
});
</script>

<script setup lang="ts">
defineProps({
  currentTitle: {
    type: String,
    required: true,
  },
});

const authStore = useAuthStore();
const layoutStore = useLayoutStore();
const { drawer, isMobileView } = storeToRefs(layoutStore);
const { user } = storeToRefs(authStore);

const toggleSidebar = () => {
  drawer.value = !drawer.value;
};
</script>

<style scoped>
#title {
  font-size: 1.5rem;
  font-weight: bold;
}

#app-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 var(--container-padding-x);
}

@media (max-width: 426px) {
  #app-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem 0 0.5rem;
  }
}
</style>
