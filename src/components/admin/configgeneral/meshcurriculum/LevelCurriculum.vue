<script setup>
import { onMounted, ref, nextTick} from 'vue'
import { asignatureStore } from '@/stores/admin/configgeneral/asignatureStore.js'
import AsignatureFormComp from '@/components/admin/configgeneral/meshcurriculum/AsignatureForm.vue'

const lstLevels = [
  {
    id: 1,
    name: 'Inicio',
    workload: '10:45-11:30',
    prerequi: 'Base de datos',
    electiva: 'NO'
  },
]
const editedIndex = ref(-1);
const asignature = ref({});

const deleteDialog = ref(false);
const deleteMessage = ref('');

const defaultAsignature = ref({
  id: null,
  name: '',
  initials: '',
  description: ''
});

const showDialog = ref(false);

async function submitAsignatura(asignatura) {
  if (asignatura.id) {
    await asignatureStore.editArea(asignatura);
  } else {
    await asignatureStore.createArea(asignatura);
  }
  asignatureStore.dialog = false;
}

function dialogFormTitle() {
  return editedIndex.value === -1 ? 'Nueva Asignatura' : 'Editar Asignatura';
}

function openNewDialog() {
  showDialog.value = !showDialog.value;
}

function openNewDialog2() {
  asignature.value = defaultAsignature.value;
  asignatureStore.dialog = true;
}
    
</script>

<template>
  <v-card
    class="mx-auto"
  >
    <template v-slot:title>
      Nivel A
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
        <!-- 
        <v-btn @click="openNewDialog" v-bind="props">
          Añadir asignatura
        </v-btn> -->
        <v-btn @click="openNewDialog">Añadir asignatura</v-btn>
      </div>
    </v-card-text>
  </v-card>
  <asignature-form-comp v-model="showDialog"></asignature-form-comp>

  <!-- 
  <asignature-form-comp
    :title="dialogFormTitle()"
    :asignature-obj="asignature"
    @submit="submitAsignatura"
    @close="closeDialog"
  /> -->
</template>

<style scoped>

</style>