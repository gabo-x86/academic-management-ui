<script setup>
import { onMounted, ref, watch } from 'vue'
import AsignatureFormComp from '@/components/admin/configgeneral/meshcurriculum/AsignatureForm.vue'
import { useSubjectStore } from '@/stores/admin/configgeneral/subjectStore'
import axios from "axios";

const subjectStore = useSubjectStore()
const areaId = 1;
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const lstLevels = [
  {
    id: 1,
    name: 'Inicio',
    workload: '10:45-11:30',
    prerequi: 'Base de datos',
    electiva: 'NO'
  }
];

const arrayMaterias = [];
const asignatures = ref({});
const asignaturesAux = ref({});
const props = defineProps({
  nivelObj: {
    type: Object,
    required: true
  },
  asignaturaArray: {
    type: Array,
    required: false
  }
})
const showDialog = ref(false)

function openNewDialog() {
  showDialog.value = !showDialog.value
}

async function submitAsignatura(asignatura) {
  console.log('new valor asignatura=', asignatura);
  asignatures.value = {
    "levelIdentifier": props.nivelObj.levelIdentifier,
    "levelName": props.nivelObj.levelName,
    "subjectCurriculumList" : asignatura
  };
  console.log('asignatures=',asignatures);
  var auxArray = [];
  asignatura.forEach(arr => {
    console.log('element=', arr);
    axios.get(`${baseUrl}admin/areas/${areaId}/subjects/${arr.subjectId}`).then((result) => {
      var objSubj = {
        "subjectId": arr.subjectId,
        "subjectName": result.data.name,
        "path": arr.path,
        "workload": arr.workload,
        "optional": arr.optional
      };
      auxArray.push(objSubj);
      // arrayMaterias.push(objSubj);
      console.log(result.data);
    });
  });
  arrayMaterias == auxArray;
  arrayMaterias = auxArray.slice();

  console.log('.....',arrayMaterias );
  



  asignaturesAux.value= {
    "levelIdentifier": props.nivelObj.levelIdentifier,
    "levelName": props.nivelObj.levelName,
    "subjectCurriculumList" : auxArray
  };
  // this.asignaturas = test;
  console.log('<---->',asignaturesAux.value.subjectCurriculumList);
}

watch(
  () => props.nivelObj,
  (obj) => {
    console.log('objeto=', obj)
    if (obj.id) {
      console.log('obj id=', obj.id)
    } else {
      console.log('Entre')
    }
  }
)
</script>

<template>
  <v-card class="mx-auto">
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
          <tr v-for="item in arrayMaterias[0]" :key="item.subjectId">
            <td>{{ item.subjectId }}</td>
            <td>{{ item.workload }}</td>
            <td>{{ item.path }}</td>
            <td>{{ item.optional }}</td>
            <td></td>
          </tr>
        </tbody>
      </v-table>
      <div class="mt-4">
        <v-btn @click="openNewDialog">Añadir asignatura</v-btn>
      </div>
    </v-card-text>
  </v-card>
  <asignature-form-comp
    v-model="showDialog"
    :nivel-obj="props.nivelObj"
    :asignatura-array="props.asignaturaArray"
    @submit="submitAsignatura"
  ></asignature-form-comp>
</template>

<style scoped></style>
