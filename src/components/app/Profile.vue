<script setup>
import { ref, onMounted } from 'vue';
import AxiosAM from "@/services/AxiosAM.js";

const profileActi = ref("");
const isProd = ref(true);

const fetchActiveProfile = async () => {
  try {
    const response = await AxiosAM.get('profileActivo');
    profileActi.value = response.data.activeProfile;
    console.log(response.data.isProd);
    isProd.value = response.data.isProd;
  } catch (error) {
    console.error('Error al obtener el perfil activo:', error);
  }
};

onMounted(() => {
  fetchActiveProfile();
});
</script>

<template>
  <v-app-bar v-if="!isProd" class="v-app-customized" color="primary" dark>
      <span class="white--text v-app-customized" style="margin-left: auto; font-size: 20px;">
        Ambiente: {{ profileActi }}
      </span>
  </v-app-bar>
</template>

<style scoped>

</style>