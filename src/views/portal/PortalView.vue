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
      <v-btn text to="/portal/registration">Registro</v-btn>
      <v-spacer></v-spacer>

      <div v-if="keycloak.authenticated">
        <v-btn id="user-options-activator" color="primary">{{store.getUserInfo()['username']}}</v-btn>
        <v-menu activator="#user-options-activator">
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn v-if="userInfo['role']==='admin'" @click="() => router.push('/admin/dashboard/')">Dashboard</v-btn>
                <v-btn v-else @click="() => router.push('/student/dashboard/')">Dashboard</v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn @click="logout">Cerrar Session</v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div v-else>
        <v-btn color="primary" @click="() => router.push('/admin/dashboard/')">Iniciar Sesión</v-btn>
      </div>
    </v-app-bar>

    <v-main :style="{ backgroundImage: `url('/src/assets/AM_assets/backgrnd.jpg')` }"> </v-main>
  </v-app>
</template>

<script setup>
//import PortalPage from '@/components/portal/PortalPage.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/MainStore.js'
import { keycloak } from "../../utils/keycloak.js"

const logoSrc = ref('/src/assets/AM_assets/logo_ej.png')
const router = useRouter()
const store = useMainStore() // Obteniendo el store de Vuex
</script>

<script>
export default {
  data() {
    return {
      userInfo: useMainStore().getUserInfo()
    };
  },
  methods: {
    async logout() {
      await keycloak.logout();
    }
  }
}
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
  background-color: rgba(0, 0, 0, 0); /* Azul marino con opacidad baja */
}

main {
  background-size: cover;
}
</style>
