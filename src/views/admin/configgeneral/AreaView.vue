<script setup>

import { onMounted, ref } from 'vue'
import { useAreaStore } from '@/stores/admin/configgeneral/areaStore.js'

const areaStore = useAreaStore();

const headers = ref([
  { title: 'Nombre', align: 'start', key: 'name'},
  { title: 'Sigla', align: 'end', key: 'initials' },
  { title: 'Acciones', align: 'end', sortable: false, key: 'actions' }
]);

onMounted(async () => {
  await areaStore.getAreas();
});
</script>

<template>
  <h1>Areas</h1>
  <v-data-table
    :headers="headers"
    :items="areaStore.areas"
    density="compact"
    item-key="name"
  ></v-data-table>
</template>

<style scoped>
</style>