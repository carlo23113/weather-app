<template>
    <v-navigation-drawer v-model="drawer" :rail="sidebar" permanent border="none" width="270"
        :color="theme.global.name.value === 'dark' ? '#0F0E0E' : '#FFFFFF'" style="position: fixed">
        <div id="logo-container">
            <v-btn icon size="small" elevation="0" @click="toggleSidebar()">
                <v-icon size="x-large">mdi-menu</v-icon>
            </v-btn>
            <div>
                <img id="logo" :src="logo" />
                <span>Weather Forecast</span>
            </div>
        </div>

        <v-list density="compact" nav>
            <v-list-subheader>Menu</v-list-subheader>
            <div v-for="(nav, i) in navLinks" :key="i">
                <v-list-item :prepend-icon="nav.icon" :title="nav.title" :to="nav.route"
                    @click.stop="$emit('click', nav)">
                </v-list-item>
            </div>
            <v-list-item prepend-icon="mdi-logout" title="Log Out" style="margin-top: auto"
                @click="logout()"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NavLink } from "@/types/layout";
import { useRouter } from "vue-router";
import { useTheme } from "vuetify";
import logo from "@/assets/images/logo.png"

export default defineComponent({
    name: "nav-sidebar",
});
</script>

<script setup lang="ts">
const theme = useTheme();

defineProps({
    navLinks: {
        type: Array<NavLink>,
        required: true,
    },
});

const router = useRouter();

let drawer = ref(true);
let sidebar = ref(false);

const toggleSidebar = () => {
    sidebar.value = !sidebar.value;
};

const logout = () => {
    router.push("/login");
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
