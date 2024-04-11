<script setup>
import {RouterView, useRouter} from 'vue-router'
import AppNavigationDrawer from '@/components/app/AppNavigationDrawer.vue'
import {ref} from "vue";

const showNavigationDrawer = ref(true);
const showAppBar = ref(true);

const router = useRouter();


function isAdmin() {
  // Lógica para verificar si el usuario es administrador
  return true;
}
// Función para verificar si el usuario es estudiante
function isStudent() {
  // Lógica para verificar si el usuario es estudiante
  return false;
}

router.beforeEach((to, from, next) => {
  // Verificar si el usuario es administrador o estudiante
  const isAdminUser = isAdmin();
  const isStudentUser = isStudent();

  // Mostrar el navigation drawer si el usuario es administrador o estudiante
  if (isAdminUser) {
    showNavigationDrawer.value = true;
  } else if (isStudentUser){
    showNavigationDrawer.value = false;
  }

  next();

});

// Verificar la ruta actual y ocultar el AppNavigationDrawer si es la vista 'portal'
router.beforeEach((to, from, next) => {
  if (to.name === 'portal') {
    showNavigationDrawer.value = false;
    showAppBar.value = false;
  } else {
    showNavigationDrawer.value = true;
    showAppBar.value = true;
  }
  next();
});
</script>

<template>
  <v-layout class="rounded rounded-md">

<!--     <app-navigation-drawer/>  -->
<!-- Main navigation drawer component -->
    <component v-if="showNavigationDrawer" :is="AppNavigationDrawer" />

    <v-app-bar v-if="showAppBar" color="primary" density="compact">
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
