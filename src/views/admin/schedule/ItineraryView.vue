<script setup>
import { onMounted,ref,reactive } from 'vue';
import { useItineraryStore } from '@/stores/admin/schedule/itineraryStore';

const itineraryStore=useItineraryStore();
const dialog=ref(false);
const dialogEdit=ref(false);
const dialogDelete=ref(false);

const headers = ref([
{ title: 'Nombre', align: 'start', key: 'name' },
  { title: 'Carrera', align: 'end', key: 'careerName' },
  { title: 'Acciones', align: 'end', sortable: false, key: 'actions' }
]);

const model = reactive({
  itinerary: {
    name:  '',
    careerId: -1
  },
});



onMounted(async () => {
  await itineraryStore.getItineraries();
});

const save=async ()=>{
  await itineraryStore.saveItinerary(model);
}

</script>

<template>
    <h1>Lista de Itinerarios</h1>
<br>
    <v-row justify="end">
      <v-dialog v-model="dialog" persistent width="40vw"  >
        <template v-slot:activator="{ props }">
          
          <v-btn prepend-icon="mdi-plus" color="primary" v-bind="props">
            <template v-slot:prepend>
              <v-icon color="white"></v-icon>
            </template>
            Nuevo
          </v-btn>

        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Añadir Itinerario</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>

                <v-form >
                  <v-col cols="12">
                  <v-text-field label="Nombre*" required v-model="model.itinerary.name"></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-select
                  :items="['Ingenieria de Sistemas']"
                  :item-value="[1]"
                  label="Carrera*"
                  required
                  v-model="model.itinerary.carrerId"
                  ></v-select>
                </v-col>

                </v-form>
                

               
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn type="submit" color="blue-darken-1" variant="text"  @click="dialog = false">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
<br>

<v-dialog v-model="dialogEdit" persistent width="40vw"  >
        <v-card>
          <v-card-title>
            <span class="text-h5">Editar Itinerario</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Nombre*" required></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Carrera*"
                  readonly
                  ></v-select>
                </v-col>

               
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialogEdit = false">
              Cancelar
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="dialogEdit = false">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <v-dialog v-model="dialogDelete" persistent width="auto">
      
      <v-card>
        <v-card-title class="text-h6">
          ¿Está seguro de que desea eliminar el itinerario?
        </v-card-title>

        <v-card-actions>
          <v-row justify="center">
            <v-btn color="primary" variant="text" @click="dialogDelete = false">
              Cancelar
            </v-btn>
            <v-btn color="primary" variant="text" @click="dialogDelete = false">
              Eliminar
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>


  <v-data-table
      :headers="headers"
      :items="itineraryStore.itineraries"
      density="compact"
      item-key="name"
      width="100px"
    >
  
    <template v-slot:[`item.actions`]="{}">
      <v-row justify="space-around">

        <v-btn variant="text" class="botones-tabla-btn" prepend-icon="mdi-eye-outline" >
            <template v-slot:prepend>
              <v-icon color="black"></v-icon>
            </template>
          Ver  
          </v-btn> 
          
          <v-btn variant="text" class="botones-tabla-btn" prepend-icon="mdi-pencil"   @click="dialogEdit = true">
            <template v-slot:prepend>
              <v-icon color="black"></v-icon>
            </template>
          Editar  
          </v-btn> 

          <v-btn variant="text" class="botones-tabla-btn" prepend-icon="mdi-trash-can-outline"  @click="dialogEdit = true">
            <template v-slot:prepend>
              <v-icon color="black"></v-icon>
            </template>
          Eliminar  
          </v-btn> 
        </v-row> 
    </template>

  </v-data-table>
  </template>
  
  <style scoped>
  
  </style>