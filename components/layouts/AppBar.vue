<template>
    <v-app-bar :elevation="0" :color="theme.global.name.value === 'dark' ? '#0F0E0E' : 'primaryBgColor'">
        <div id="app-bar">
            <page-title :current-title="currentTitle"></page-title>
            <v-btn variant="text" id="user" style="text-transform: capitalize">
                <v-avatar class="mr-2" size="small">
                    <v-img :src="githubIcon"></v-img>
                </v-avatar>
                John Smith
            </v-btn>
        </div>
    </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import mitt from "mitt";
import { useTheme } from "vuetify";
import PageTitle from "@/components/layouts/PageTitle.vue";
import githubIcon from "@/assets/images/github-icon.png"

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

const emitter = mitt();
const theme = useTheme();

const toggleSidebar = () => {
    emitter.emit("toggle-sidebar");
};

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
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
</style>
