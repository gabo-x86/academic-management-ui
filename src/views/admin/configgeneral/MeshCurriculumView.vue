<script setup>
import { onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'
import { useCurriculumStore } from '@/stores/admin/configgeneral/curriculumStore';

const router = useRouter();
const curriculumStore = useCurriculumStore();
const carreraSelect = { id: 1, name: 'Ing. de Sistemas'};
// const idAreaAct = router.params.idArea;
// const idCarrierAct = router.params.idCarrera;
// console.log(router.params.idCarrera);
// console.log('idArea=',idAreaAct);
// console.log('idCarrier=',idCarrierAct);
/*
const headers = ref([
  { title: 'Nº', align: 'start', key: 'id' },
  { title: 'Nombre', align: 'start', key: 'name' },
  { title: 'Min Materias Aprobar', align: 'start', key: 'minmaterias' },
  { title: 'Fecha Inicio', align: 'start', key: 'fechaini' },
  { title: 'Fecha Fin', align: 'start', key: 'fechafin' },
  { title: 'Acciones', align: 'center', sortable: false, key: 'actions' }
]);
*/
const headers = ref([
  { title: 'Nº', align: 'start', key: 'id' },
  { title: 'Nombre', align: 'start', key: 'name' },
  { title: 'Min Materias Aprobar', align: 'start', key: 'minApprovedSubjects' },
  { title: 'Fecha Inicio', align: 'start', key: 'startDate',sortable: false },
  { title: 'Fecha Fin', align: 'start', key: 'endDate' },
  { title: 'Acciones', align: 'center', sortable: false, key: 'actions' }
]);
/*
const lstcurruculums = ref([
  {
    id: 1,
    name: 'Plan nuevo 2023',
    minmaterias: 52,
    fechaini: '29/01/2023',
    fechafin: 'indefinido',
  },
]);*/
/*
async function getArticulo() {
  try {
    console.log('-->', this);
    // console.log('ruta=',this.$router.push({name: "idCarrera"}))
  } catch (error) {
    console.log(error)
  }
}
*/
function newMeshcurriculum(item){
  console.log('item id=', item);
  router.push({name:'admin-newmeshcurriculum', params: { idCarrera: 1 }});
}

onMounted(async () => {
  await curriculumStore.getCurriculums(carreraSelect);
  console.log('Entreeeeeeeeee', carreraSelect);
  console.log('store curriculum', curriculumStore.curriculums);
});

/*
onMounted(() => {
  getArticulo();
  // const id = router.params.idArea;
  console.log('---',this.$router.go(-1));
  console.log(this.$route.params.idCarrera);
  console.log('ID=',this.$route.params.idCarrera);
  // console.log('--->',router.params.idArea);
}) */
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
      <v-btn class="mr-2" color="primary" @click="newMeshcurriculum($route.params.idCarrera)">
        <v-icon>mdi-plus</v-icon>Nuevo
      </v-btn>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table-virtual
          :headers="headers"
          :items="curriculumStore.curriculums"
          height="400"
          item-value="name"
        >
          <template v-slot:item.startDate="{ item }">
            {{item.startDate[2]}}/{{item.startDate[1]}}/{{item.startDate[0]}}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              size="small"
              class="me-2"
              title="Ver"
              @click="editItem(item)"
            >
              mdi-eye
            </v-icon>
            <v-icon
              size="small"
              class="me-2"
              title="Editar"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              size="small"
              title="Eliminar"
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table-virtual>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

</style>