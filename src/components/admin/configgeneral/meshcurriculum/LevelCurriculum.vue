<script setup>
import { onMounted, ref, watch} from 'vue'
import AsignatureFormComp from '@/components/admin/configgeneral/meshcurriculum/AsignatureForm.vue'

const lstLevels = [
  {
    id: 1,
    name: 'Inicio',
    workload: '10:45-11:30',
    prerequi: 'Base de datos',
    electiva: 'NO'
  },
];
const props = defineProps({
  nivelObj: {
    type: Object,
    required: true
  },
  asignaturaArray: {
    type: Array,
    required: false
  }
});
const showDialog = ref(false);

function openNewDialog() {
  showDialog.value = !showDialog.value;
}

watch(() => props.nivelObj, (obj) => {
  console.log('objeto=', obj);
  if (obj.id) {
    console.log('obj id=', obj.id);
  } else {
    console.log('Entre');
  }
});
    
</script>

<template>
  <v-card
    class="mx-auto"
  >
    <template v-slot:title>
      {{ props.nivelObj.levelName }}
      <v-divider></v-divider>
    </template>

    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Nombre</th>
            <th class="text-center">Carga horaria</th>
            <th class="text-center">Prerequisitos</th>
            <th class="text-center">Electiva</th>
            <th class="text-center">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lstLevels" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.workload }}</td>
            <td>{{ item.prerequi }}</td>
            <td>{{ item.electiva }}</td>
            <td></td>
          </tr>
        </tbody>
      </v-table>
      <div class="mt-4">
        <v-btn @click="openNewDialog">Añadir asignatura</v-btn>
      </div>
    </v-card-text>
  </v-card>
  <asignature-form-comp v-model="showDialog"></asignature-form-comp>
</template>

<style scoped>

</style>