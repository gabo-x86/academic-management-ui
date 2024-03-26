<script setup>
import { onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'
import { useCurriculumStore } from '@/stores/admin/configgeneral/curriculumStore';

const router = useRouter();
const curriculumStore = useCurriculumStore();
const curriculum = ref({});
const carreraSelect = { id: 1, name: 'Ing. de Sistemas'};
const headers = ref([
  { title: 'Nº', align: 'start', key: 'id' },
  { title: 'Nombre', align: 'start', key: 'name' },
  { title: 'Min Materias Aprobar', align: 'start', key: 'minApprovedSubjects' },
  { title: 'Fecha Inicio', align: 'start', key: 'startDate',sortable: false },
  { title: 'Fecha Fin', align: 'start', key: 'endDate' },
  { title: 'Acciones', align: 'center', sortable: false, key: 'actions' }
]);
const editedIndex = ref(-1);
const deleteDialog = ref(false);
const deleteMessage = ref('');

function newMeshcurriculum(item){
  console.log('item id=', item);
  router.push({name:'admin-newmeshcurriculum', params: { idCarrera: carreraSelect.id }});
}

function deleteItem(item) {
  editedIndex.value = curriculumStore.curriculums.indexOf(item);
  curriculum.value = Object.assign({}, item);
  deleteMessage.value = `¿Quieres eliminar el curriculum "${item.name}"?`
  deleteDialog.value = true;
}

async function confirmDelete() {
  await curriculumStore.deleteCurriculum(curriculum.value);
  closeDeleteDialog();
}

function closeDeleteDialog() {
  deleteDialog.value = false;
}

onMounted(async () => {
  await curriculumStore.getCurriculums(carreraSelect);
});
</script>

<template>
  <div class="pa-4">
    <div class="py-4 mx-lg-auto">
      <p><strong>Carrera: </strong>{{ carreraSelect.name }}</p>
    </div>

    <v-row align="center" justify="center">
      <v-col class="fill-height" height="500">
        <div class="text-center grey d-flex flex-column align-center justify-center" height="100%">
          <h3>Lista de mallas curriculares</h3>
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
          <template v-slot:item.endDate="{ item }">
            <div v-if="item.endDate != null">
              {{item.endDate[2]}}/{{item.endDate[1]}}/{{item.endDate[0]}}
            </div>
            <div v-else>
              {{ item.endDate }}
            </div>
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
  </div> <v-dialog v-model="deleteDialog" persistent width="350">
    <v-card>
      <v-card-title class="text-h5">Confirmar eliminación</v-card-title>
      <v-card-text>{{deleteMessage}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green-darken-1" variant="text" @click="closeDeleteDialog">
          CANCEL
        </v-btn>
        <v-btn color="green-darken-1" variant="text" @click="confirmDelete">
          SI
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
</template>

<style scoped>

</style>