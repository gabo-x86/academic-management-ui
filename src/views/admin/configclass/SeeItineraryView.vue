<script setup>
import { ref } from 'vue'

const headers = ref([
  { title: 'N°', value: 'index', align: 'center' },
  { title: 'Nombre Asignatura',align:'start', key: 'subjects' , style: 'font-weight: bold;'},
  { title: 'Grupo',align:'start', key: 'groups' },
  { title: 'Horario',align:'start', key: 'scheals' },
  { title: 'Aula',align:'start', key: 'classroom' },
  { title: 'Docente Designado',align:'start', key: 'professor' },
  { title: 'Opciones', align:'center' ,sortable: false, key: 'actions' }
]);
</script>

<template>
  <v-card
    class="mx-auto my-16"
    min-width="1000"
    max-width="1300"
  >
    <p class="text-center text-h5 font-weight-bold my-4" >
      Ver Itinerario 1er Semestre
    </p>
    <div class="d-flex flex-row-reverse">
      <v-btn
        class="mx-9 my-4"
        color="primary"
        width="200"
        height="50"
        to="/admin/itinerary/groups">
        <template v-slot:prepend>
          <v-icon class="white-icon">mdi-plus</v-icon>
        </template>
        Nuevo
      </v-btn>
    </div>
  <v-card-text>
    <v-data-table
      :headers="headers"
      :items="headers"
      density="compact"
      item-key="name"
    >
      <template v-slot:[`item.actions`]="{  }">

        <v-row justify="space-around">
          <v-btn variant="text" >
            <v-icon icon="mdi-pencil"></v-icon>
            editar
          </v-btn>
          <v-btn variant="text" >
            <v-icon icon="mdi-delete"></v-icon>
            eliminar
          </v-btn>
        </v-row>
      </template>
    </v-data-table>
  </v-card-text>
  </v-card>
</template>

<style scoped>

</style>