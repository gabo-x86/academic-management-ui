<script setup>
import { RouterView } from 'vue-router'
import AppNavigationDrawer from '@/components/app/AppNavigationDrawer.vue'

</script>

<template>
  <v-layout class="rounded rounded-md">

    <app-navigation-drawer/> <!-- Main navigation drawer component -->

    <v-app-bar color="primary" density="compact" style="height: 56px; padding-top: 5px;">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Admin Académica</v-app-bar-title>
      <template v-slot:append>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

    <v-main style="min-height: 300px;">
      <RouterView/>
    </v-main>
  </v-layout>
</template>

<style scoped>

</style>
