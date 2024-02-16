<script setup>
import { onMounted} from 'vue'
// import { useRouter } from 'vue-router'

// const router = useRouter();
// const idAreaAct = router.params.idArea;
// const idCarrierAct = router.params.idCarrera;
// console.log(router.params.idCarrera);
// console.log('idArea=',idAreaAct);
// console.log('idCarrier=',idCarrierAct);
async function getArticulo() {
  try {
    console.log('-->', this);
    // console.log('ruta=',this.$router.push({name: "idCarrera"}))
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getArticulo();
  // const id = router.params.idArea;
  /*console.log('---',this.$router.go(-1));
  console.log(this.$route.params.idCarrera);
  console.log('ID=',this.$route.params.idCarrera);*/
  // console.log('--->',router.params.idArea);
})
</script>

<template>
  <div class="pa-4">
    <div class="py-4 mx-lg-auto">
      <p><strong>Carrera: </strong>Ing. de Sistemas</p>
    </div>

    <v-row align="center" justify="center">
      <v-col class="fill-height" height="500">
        <div class="text-center grey d-flex flex-column align-center justify-center" height="100%">
          <h3>Lista de mallas curriculares</h3>
          <p>Parámetro idCarrera: {{ $route.params.idCarrera }}</p>
        </div>
      </v-col>
    </v-row>
    <v-row class="justify-end">
      <v-btn class="mr-2" color="primary">
        <v-icon>mdi-plus</v-icon>Nuevo
      </v-btn>
    </v-row>

    
    
  </div>
</template>

<style scoped>

</style>