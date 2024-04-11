<script setup>
import {ref} from "vue";
import AppNavigationDrawer from "@/components/app/AppNavigationDrawer.vue";
import AppNavigationDrawer_est from "@/components/app/AppNavigationDrawer_est.vue";
import {useMainStore} from "@/stores/MainStore.js";

const isAdmin = ref(false);
const isStudent = ref(true);
console.log("estado de usuario o rol en pantalla"+useMainStore().state.userRole)
</script>

<template>
  <h1>DashBoard Estudiante</h1>
  <component v-if="isAdmin" :is="AppNavigationDrawer" />
  <component v-else-if="isStudent" :is="AppNavigationDrawer_est" />
</template>

<style scoped>

</style>