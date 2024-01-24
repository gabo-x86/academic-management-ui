<template>
    <v-dialog v-model="DeleteCareerVisible"  @update:modelValue="$emit('update:eliminarCarrera', $event)">
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

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAlert } from '@mdi/js'
import axios from 'axios';
      
export default {
  props: ['eliminarCarrera', 'deleteCareerId'],
  inject: ['refreshCareers'],
  components: {
		SvgIcon,
	},
  data() {
    return {
      DeleteCareerVisible: this.editCareer,
      icon4: mdiAlert,
    };
  },
  watch: {
    eliminarCarrera(newValue) {
      this.DeleteCareerVisible = newValue;
    },
  },
  methods: {
    closeDeleteDialog() {
      this.$emit('close-deleteDialog', false);
    },
    deleteCareerById(careerId){
      axios.delete(`http://localhost:8080/admin/areas/2/careers/${careerId}`).then(res=>{
          console.log(res)
          this.refreshCareers()
          this.$emit('close-deleteDialog', false);
          
        }).catch( function(error){

        })
    }
  },
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