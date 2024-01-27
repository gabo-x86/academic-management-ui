<script setup>
import {onMounted, ref} from "vue";
import ClassroomFrom from '@/components/app/ClassroomForm.vue'
import ClassroomEdit from "@/components/app/ClassroomEdit.vue";
import ClassroomDelete from "@/components/app/ClassroomDelete.vue";

const headers = ref([
  { title: 'Sigla',align:'center', key: 'initials' },
  { title: 'Nombre',align:'center', key: 'name' },
  { title: 'Tipo',align:'center', key: 'type' },
  { title: 'Direccion',align:'center', key: 'address' },
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
      Lista de Aulas
    </p>
    <ClassroomFrom/>

    <v-card-text>
      <v-data-table
          :headers="headers"
          :items="headers"
          density="compact"
          item-key="name"
      >
        <template v-slot:[`item.actions`]="{ item }">

          <v-row justify="space-around">
            <v-btn variant="text" >
              <v-icon icon="mdi-pencil"></v-icon>
            </v-btn>
            <v-btn variant="text">
              <v-icon icon="mdi-delete"></v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>