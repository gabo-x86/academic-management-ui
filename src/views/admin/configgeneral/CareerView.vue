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
    <v-table  height="300px">
      <thead style="background-color: #DEEAF8 ;">
      <tr>
        <th class="text-left">
          Código
        </th>
        <th class="text-left">
          Carrera
        </th>
        <th class="text-center">
          Acciones
        </th>
      </tr>
    </thead>
      <tbody>
        <tr v-for="item in careers" :key="item.id">
          <td>{{ item.code }}</td>
          <td>{{ item.name }}</td>
          <td>
            <v-row justify="space-around">
          <v-btn variant="text" class="botones-tabla-btn">
            <svg-icon type="mdi" :path="icon2"></svg-icon>
            Ver planes de estudio
          </v-btn>
          <v-btn variant="text" class="botones-tabla-btn"  @click="editCareerSetId(item.id)">
          <svg-icon type="mdi" :path="icon1"></svg-icon>
          Editar  
          </v-btn> 
          <v-btn variant="text" class="botones-tabla-btn"  @click="delteCareerSetId(item.id)">
          <svg-icon type="mdi" :path="icon3"></svg-icon>
            Eliminar
          </v-btn>
        </v-row> 
         </td>
        </tr>
      </tbody>
    </v-table>
    <edit-career
  v-model:editCareer="editCareer"
  :editCareerId="editCareerId"
  @close-dialogEdit="updateEditCareer"
></edit-career>
  </v-container>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiSquareEditOutline, mdiFileDocumentOutline, mdiTrashCanOutline} from '@mdi/js'
import axios from 'axios';
import {useMainStore} from '@/stores/global'
import CareerForm from '@/components/app/CareerForm.vue'
import EditCareer from '@/components/app/EditCareer.vue'
import DeleteCareer from '@/components/app/DeleteCareer.vue'

export default {
  components: {
		SvgIcon,
    CareerForm,
    EditCareer,
    DeleteCareer,
	},
    setup() {
    const mainStore = useMainStore()

    return {
      mainStore
    }
    },
  data() {
    return {
      icon1: mdiSquareEditOutline,
      icon2: mdiFileDocumentOutline,
      icon3: mdiTrashCanOutline,
      crearCarrera:false,
      eliminarCarrera:false,
      editCareer: false,
      editCareerId: 0,
      deleteCareerId: 0,
      areaId: this.$globalAreaId,
      careers:[],
      headers: [
        { text: 'Código', align: 'start', sortable: false, key: 'codeCareer' },
        { text: 'Carrera', sortable: false, key: 'name' },
        { text: 'Acción', sortable: false},
      ],
      }
    },
    methods:{
      getCareer(){
        
        axios.get(`http://localhost:8080/admin/areas/${this.mainStore.areaId}/careers`).then(res=>{
          console.log(res)
          this.careers = res.data;
        }).catch( function(error){

        })
        
      },
      editCareerSetId(id) {
      this.editCareerId = id;
      this.editCareer = true; 
    },
    delteCareerSetId(id){
      this.deleteCareerId = id;
      this.eliminarCarrera = true; 
    },
    updateEditCareer(value) {
      if (value === false) {
        console.log(this.editCareer)
      }
      this.editCareer = value;
      
    },
    updateDeleteCareer(value) {
      if (value === false) {
        console.log(this.eliminarCarrera)
      }
      this.eliminarCarrera = value;
    },
    },
    provide() {
      return {
        refreshCareers: this.getCareer
      }
    },
    mounted(){  
      this.getCareer();
    }
  }
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
  .eliminar-letra {
    font-family: sans-serif;
    font-weight: bold; 
    font-size: 24px;
  }

  .button-dialoge {
    width: 180px;
    height: 60px;
    border-radius: 15px;
  }

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
  .botones-tabla-btn {
    font-size: 12px; 
  }
  .table-container {
    margin: 10px auto; 
    max-width: 1500px;
  }
</style>