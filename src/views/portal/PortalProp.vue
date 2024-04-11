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

    <v-main :style="{ backgroundImage: `url('/src/assets/AM_assets/backgrnd.jpg')` }">
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";

const logoSrc = ref('/src/assets/AM_assets/logo_ej.png');
const router = useRouter();
const items = [
  { title: 'Administrador', route: '/route1' },
  { title: 'Estudiante', route: '/admin/portal' },
];

const navigateTo = (route) => {
  router.push(route);
};
</script>

<style scoped>
/* Estilo adicional para el app bar */
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
