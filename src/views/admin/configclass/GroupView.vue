<script setup>
import { ref } from 'vue'

const index =['hola', 'adios', 'caio']

const headers = ref([
  { title: 'Dia', value: 'index', align: 'center' },
  { title: 'Horario Inicio',align:'start', key: 'subjects' , style: 'font-weight: bold;'},
  { title: 'Horario Fin',align:'start', key: 'groups' },
  { title: 'Aula',align:'start', key: 'scheals' },
  { title: 'Docente',align:'start', key: 'classroom' },
  { title: 'Opcion', align:'center' ,sortable: false, key: 'actions' }
]);
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
      to="/admin/itinerary/list"
    >
      volver
    </v-btn>
    </div>
    <p class="text-center text-h5 font-weight-bold my-4" >
      Crear Nuevo Grupo
    </p>
    <v-card>
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
  <div class="d-flex flex-row-reverse">
    <v-btn
      class="mx-9"
      color="primary"
      width="200"
      height="50"
      >
      <template v-slot:prepend>
        <v-icon class="white-icon">mdi-plus</v-icon>
      </template>
      Añadir
    </v-btn>
  </div>
  <v-card-text>
    <v-data-table
      :headers="headers"
      :items="index"
      density="compact"
      item-key="name"
      title="test"
    >
      <template v-slot:[`item.actions`]="{  }">

        <v-row justify="space-around">
          <v-btn variant="text" >
            <v-icon icon="mdi-close-circle-outline" color="red"></v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-table>
    <v-row justify="end">
      <v-col cols="3">
        <v-btn
          class="mx-4"
          color="primary"
          width="200"
          height="50"
          to="/admin/itinerary/list"
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
  </v-card-text>
    </v-card>
</v-card>
</template>

<style scoped>

</style>