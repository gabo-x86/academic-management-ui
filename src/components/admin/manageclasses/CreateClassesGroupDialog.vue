<template>
  <v-row justify="end" class="me-3">
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
      <template v-slot:activator="{ props }">
        <v-btn color="primary darken-2" prepend-icon="$plus" v-bind="props" variant="elevated">
          Nuevo Grupo
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Nuevo Grupo</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" @click="dialog = false">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-item>
          <classes-table-group />
        </v-card-item>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { useAreaStore } from '@/stores/admin/configgeneral/areaStore';

import ClassesTableGroup from './ClassesTableGroup.vue';

export default {
  created(){
    /*const { areas, getAreas} = useAreaStore() // Obtiene las carreras y el método getCareers del store
    let data = await getAreas(idArea) // Ajusta esto según cómo obtengas el areaId en tu aplicación

      let list = [];
      for(let i=0;i<careers.length; i++){
        list.push(careers[i].name)
      }

      //['Ing de sistemas', 'Ing Comercial']
      this.carreraSel = list[0]
      this.carrerasList = list

      this.carrerasData = careers;*/
  },
  
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    }
  },

  components:{
    ClassesTableGroup
  }
}
</script>