<template>
    <v-layout>
        <nav-sidebar :nav-links="navLinks" @click="onClickNav($event)"></nav-sidebar>
        <v-main>
            <app-bar :current-title="currentTitle" style="position: fixed"></app-bar>

            <div id="content">
                <slot></slot>
            </div>
        </v-main>
    </v-layout>
</template>
  
<script lang="ts">
import { NavSidebar, AppBar } from "~~/components/layouts";
import { defineComponent, ref } from "vue";
import { NavLink } from "@/types/layout";

export default defineComponent({
    name: "default",
});
</script>
  
<script setup lang="ts">
import { useLayoutStore } from "@/stores/layout";

const layoutStore = useLayoutStore();
const navLinks = layoutStore.navLinks;
let currentTitle = ref("Home");

const onClickNav = (data: NavLink) => {
    if (data.title) {
        currentTitle.value = data.title;
    }
};
</script>
  
<style lang="scss" scoped>
#content {
    padding: var(--container-padding);
    min-height: 100vh;
    background-color: var(--primary-bg-color);
}
</style>
  