<template>
  <v-app>
    <v-main>
      <v-container>
        <HorarioForm />
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script>

import HorarioForm from "../configHorario/HorarioForm.vue"

export default {
  name: "MainHorario",
  components: {
    HorarioForm
  },
};
</script>