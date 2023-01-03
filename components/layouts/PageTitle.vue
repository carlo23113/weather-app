<template>
    <div id="page-title-container">
        <h1>{{ currentTitle }}</h1>
    </div>
</template>

<script setup lang="ts">
defineProps({
    currentTitle: {
        type: String,
        default: "Dashboard",
    },
});
</script>

<style scoped>
#page-title-container {
    /* width: 100%; */
    display: flex;
    /* margin-bottom: 1rem; */
}

h1 {
    font-size: 1.5rem;
    font-weight: 600;
}
</style>
