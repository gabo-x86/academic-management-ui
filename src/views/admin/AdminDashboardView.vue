<script setup>

import {useMainStore} from "@/stores/MainStore.js";



console.log("estado de usuario o rol en pantalla"+useMainStore().state.userRole)
</script>

<template>
  <h1>DashBoard Administrador</h1>

</template>

<style scoped>

</style>