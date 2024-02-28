<script setup>
import {onMounted, ref} from 'vue'
import {useRoute} from "vue-router";
import {useMainStore} from "@/stores/MainStore.js";


const route = useRoute();
const mainStore=useMainStore()

const index =['hola', 'adios', 'caio']

const headers = ref([
  { title: 'Dia', value: 'index', align: 'center' },
  { title: 'Horario Inicio',align:'start', key: 'subjects' , style: 'font-weight: bold;'},
  { title: 'Horario Fin',align:'start', key: 'groups' },
  { title: 'Aula',align:'start', key: 'scheals' },
  { title: 'Docente',align:'start', key: 'classroom' },
  { title: 'Opcion', align:'center' ,sortable: false, key: 'actions' }
])

const careerId = ref(null)
const itineraryId=ref(null)

onMounted(()=>{
  careerId.value = route.params.careerId
  itineraryId.value= route.params.itineraryId

  console.log('careerId:'+ careerId.value)
  console.log('itineraryId:'+itineraryId.value)
})

</script>

<template>
  <v-card
  class="mx-auto my-16"
  min-width="1000"
  max-width="700"
>
    <div class="d-flex flex-row-reverse">
    <v-btn
      class="mx-10"
      color="primary"
      width="200"
      height="50"
      :to="'/admin/areas/'+mainStore.area.areaId+'/careers/'+careerId+'/itineraries/'+itineraryId+'/edit'">
      <<< volver
    </v-btn>
    </div>
    <p class="text-center text-h5 font-weight-bold my-4" >
      Crear Grupo
    </p>
    <v-card >
      <v-row class="mx-auto my-1">
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-select
            :items="['Sistemas II', 'Calculo II', 'Ecuaciones']"
            label="Asignatura *"
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
            label="Identificador de grupo *"
            variant="outlined"
            class="mx-4"
          ></v-text-field>
        </v-col>

      </v-row>
  <v-card-text>
    <v-data-table
      :headers="headers"
      :items="index"
      density="compact"
      item-key="name">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Horario</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary">
            Nuevo
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{  }">

        <v-row justify="space-around">
          <v-btn variant="text" >
            <v-icon icon="mdi-close-circle-outline" color="red"></v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-table>

  </v-card-text>
    </v-card>
    <v-row justify="end" class="my-2">
      <v-col cols="3">
        <v-btn
            class="mx-4"
            color="primary"
            width="200"
            height="50"
            :to="'/admin/areas/'+mainStore.area.areaId+'/careers/'+careerId+'/itineraries/'+itineraryId+'/edit'"
        >
          Cancelar
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
            class="mx-4"
            color="primary"
            width="200"
            height="50"
        >
          Guardar
        </v-btn>
      </v-col>
    </v-row>
</v-card>
</template>

<style scoped>

</style>