<template>
  <div>
    <h1 style="text-align: center;">Carreras</h1>
    <div class="button-with-margin">
    <v-btn
      prepend-icon="mdi-plus"
      color="blue"
      style="width: 200px; height: 50px;"
      @click="crearCarrera = true"
    >
      <template v-slot:prepend>
        <v-icon class="white-icon">mdi-plus</v-icon>
      </template>
      Crear Nuevo
    </v-btn>
    <career-form
      v-model:crearCarrera="crearCarrera"
      v-model:code="code"
      v-model:name="name"
      v-model:initials="initials"
      v-model:description="description"
      v-model:area="area"
      @update:code="val => code = val" 
      @update:name="val => name = val" 
      @update:initials="val => initials = val" 
      @update:description="val => description = val" 
      @update:area="val => area = {id: val}"  
      @close-dialog="crearCarrera = false"
    ></career-form>

    <delete-career
      v-model:eliminarCarrera="eliminarCarrera"
        :deleteCareerId="deleteCareerId"
      @close-deleteDialog="updateDeleteCareer"
    ></delete-career>    
  </div>    
    <v-container class="table-container">
      <v-data-table
      v-if="careersReady"
    :headers="headers"
    :items="careerStore.careers"
    density="compact"
    :sort-by="[{ key: 'code', order: 'asc' }]"
     >
     <template v-slot:[`item.actions`]="{ item }">
      <v-row justify="space-around">
          <v-btn variant="text" class="botones-tabla-btn">
            <svg-icon type="mdi" :path="icon2"></svg-icon>
            Ver planes de estudio
          </v-btn>
          <v-btn variant="text" class="botones-tabla-btn"  @click="editCareerSetId(item.id)">
          <svg-icon type="mdi" :path="icon1"></svg-icon>
          Editar  
          </v-btn> 
          <v-btn variant="text" class="botones-tabla-btn"  @click="deleteCareerSetId(item.id)">
          <svg-icon type="mdi" :path="icon3"></svg-icon>
            Eliminar
          </v-btn>
        </v-row> 
    </template>
  </v-data-table>
    <edit-career
  v-model:editCareer="editCareer"
  :editCareerId="editCareerId"
  @close-dialogEdit="updateEditCareer"
></edit-career>
  </v-container>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/stores/global';
import { useCareerStore } from '@/stores/admin/configgeneral/careerStore';
import CareerForm from '@/components/app/CareerForm.vue';
import EditCareer from '@/components/app/EditCareer.vue';
import DeleteCareer from '@/components/app/DeleteCareer.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import {
  mdiSquareEditOutline,
  mdiFileDocumentOutline,
  mdiTrashCanOutline,
} from '@mdi/js';

const mainStore = useMainStore();
const careerStore = useCareerStore();

const icon1 = mdiSquareEditOutline;
const icon2 = mdiFileDocumentOutline;
const icon3 = mdiTrashCanOutline;

const crearCarrera = ref(false);
const eliminarCarrera = ref(false);
const editCareer = ref(false);
const careersReady = ref(false);
const editCareerId = ref(0);
const deleteCareerId = ref(0);
const careers = ref([]);

const headers = [
  { title: 'Código', align: 'start', key: 'code' },
  { title: 'Carrera', align: 'start', key: 'name' },
  { title: 'Acción', align: 'center', sortable: false, key: 'actions' },
];
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

const editCareerSetId = (areaID) => {
  editCareerId.value = areaID;
  editCareer.value = true;
};

const deleteCareerSetId = (id) => {
  deleteCareerId.value = id;
  eliminarCarrera.value = true;
};

const updateEditCareer = (value) => {
  if (value === false) {
    console.log(editCareer.value);
  }
  editCareer.value = value;
};

const updateDeleteCareer = (value) => {
  if (value === false) {
    console.log(eliminarCarrera.value);
  }
  eliminarCarrera.value = value;
};



onMounted(async () => {
  await careerStore.getCareers(mainStore.areaId);
  careers.value = careerStore.careers.map((career) => ({
    ...career,
    formattedCreationDate: formatDate(career.creationDate),
  }));
  careersReady.value = true;
  console.log(careerStore.careers);
});
</script>

<style scoped>

  .table-container {
    margin: 10px auto; 
    max-width: 1500px;
  }

.white-icon {
    color: white !important;
  }
  .button-with-margin {
    margin-right: 20px;
    margin-bottom: 20px;
    text-align: right;
  }
  .table-container {
    margin: 10px auto; 
    max-width: 1500px;
  }
</style>