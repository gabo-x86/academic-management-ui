<template>
  <v-app>
    <v-app-bar app>
      <!-- Botones del app bar -->
      <v-btn text to="/">Facultades</v-btn>
      <v-spacer></v-spacer>
      <v-btn text to="/mapa">Mapa del sitio</v-btn>
      <v-spacer></v-spacer>
      <v-card class="logo-container" flat>
        <div class="logo-wrapper">
          <v-img :src="logoSrc" alt="Logo" />
        </div>
      </v-card>
      <v-spacer></v-spacer>
      <v-btn text to="/contactos">Contactos</v-btn>
      <v-spacer></v-spacer>

      <!-- Botón de login -->
      <v-btn id="menu-activator" color="primary">Login</v-btn>

      <!-- Menú desplegable -->
      <v-menu activator="#menu-activator">
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" @click="() => navigateTo(item.route)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Mostrar el cajón de navegación según el tipo de usuario -->
    <component v-if="isAdmin" :is="AppNavigationDrawer" />
    <component v-else-if="isStudent" :is="AppNavigationDrawer_est" />

    <v-main :style="{ backgroundImage: `url('/src/assets/AM_assets/backgrnd.jpg')` }">
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/stores/MainStore.js';
import AppNavigationDrawer_est from "@/components/app/AppNavigationDrawer_est.vue";
import AppNavigationDrawer from "@/components/app/AppNavigationDrawer.vue";

const logoSrc = ref('/src/assets/AM_assets/logo_ej.png');
const router = useRouter();
const items = [
  { title: 'Administrador', route: '/admin/dashboard/' },
  { title: 'Estudiante', route: '/estudiante/dashboard/' },
];

const { setUserRole } = useMainStore();

const navigateTo = (route, userType) => {
  router.push(route);
  if (userType === 'admin') {
    setUserRole('admin'); // Cambia el rol a 'admin'
  } else if (userType === 'estudiante') {
    setUserRole('est'); // Cambia el rol a 'estudiante'
  }
};
</script>

<style scoped>
.centered-app-bar {
  margin: 0 auto;
  max-width: 900px;
}
.logo-container {
  display: flex;
  justify-content: center;
}

.logo-wrapper {
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: transparent;
}

.v-btn {
  font-family: Arial, sans-serif;
  color: black;
  font-weight: bold;
  font-size: 16px;
  background-color: transparent;
}

.v-btn:hover {
  background-color: rgba(0, 0, 0, 0.0); /* Azul marino con opacidad baja */
}

main {
  background-size: cover;
}
</style>
