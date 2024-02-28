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

import HorarioForm from "../../../components/app/SheduleForm.vue"

export default {
  name: "MainHorario",
  components: {
    HorarioForm
  },
};
</script>