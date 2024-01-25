<template>
    <v-dialog v-model="deleteCareerVisible"  @update:modelValue="$emit('update:eliminarCarrera', $event)">
      <v-card class="card-delete-style">
        <v-card-title class="eliminar-letra">
          <svg-icon  type="mdi" :path="icon4"></svg-icon>
          Eliminar Carrera
        </v-card-title>
          <v-card-text>
            <v-sheet width="500" class="mx-auto">
              <h5 class="eliminar-letra">
                ¿Estas Seguro de Eliminar la carrera?
              </h5>
              <v-container  width="500" >
                            <v-row justify="space-around">
                            <v-btn type="submit" class=" button-delete-dialoge mt-5 left-button  mr-auto "  color="blue" dark @click="deleteCareerById(deleteCareerId)">Aceptar</v-btn>
                            <v-btn type="submit" class=" button-delete-dialoge mt-5 right-button ml-auto " color="red" dark @click="closeDeleteDialog">Cancelar</v-btn>
                          </v-row>
                          </v-container>
            </v-sheet>
          </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive, watch, getCurrentInstance} from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAlert } from '@mdi/js';
import { useCareerStore } from '@/stores/admin/configgeneral/careerStore';
import { useMainStore } from '@/stores/global';

const props = defineProps(['eliminarCarrera', 'deleteCareerId']);
const { emit } = getCurrentInstance();
const mainStore = useMainStore();
const deleteCareerVisible = ref(props.eliminarCarrera);
const icon4 = mdiAlert;

watch(() => props.eliminarCarrera, (newValue) => {
  deleteCareerVisible.value = newValue;
});

const closeDeleteDialog = () => {
  emit('close-deleteDialog', false);
};

const deleteCareerById = (careerId) => {
  console.log(careerId)
  axios.delete(`http://localhost:8080/admin/areas/2/careers/${careerId}`)
    .then((res) => {
      console.log(res);
      useCareerStore().getCareers(mainStore.areaId);
      emit('close-deleteDialog', false);

    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

<style scoped>
 .button-delete-dialoge {
    width: 150px;
    height: 40px;
    border-radius: 15px;
  }

  .card-delete-style {
    width: 600px;
    height: 200px;
    align-self: center;
    text-align: left;
  }
  .eliminar-letra {
    font-family: sans-serif;
    font-weight: bold; 
    font-size: 24px;
  }
  


</style>