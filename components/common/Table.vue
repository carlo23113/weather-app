<template>
  <v-card
    ><v-table>
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i" class="text-left">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d, index) in data" :key="index">
          <td
            v-for="(header, h) in headers"
            :key="h"
          >
            {{ d[header.value] }}
          </td>
        </tr>
      </tbody>
    </v-table></v-card
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Headers } from "~~/types";
import { Weather } from "~~/types/weather";

export default defineComponent({
  name: "Table",
});
</script>

<script setup lang="ts">
defineProps<{
  headers: Headers[];
  data: Array<Weather>;
}>();
</script>
