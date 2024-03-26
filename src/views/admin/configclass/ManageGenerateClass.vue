<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>Área Seleccionada</h2>
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="4"><strong>ID:</strong></v-col>
                <v-col>{{ area.areaId }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="4"><strong>Nombre:</strong></v-col>
                <v-col>{{ area.name }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="4"><strong>Iniciales:</strong></v-col>
                <v-col>{{ area.initials }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="4"><strong>Activo:</strong></v-col>
                <v-col>{{ area.active }}</v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { useMainStore } from '@/stores/MainStore'
  import { ref, watch } from 'vue'
  
  export default {
    setup() {
      const mainStore = useMainStore()
      const area = ref(mainStore.area)
  
      // Observar cambios en el área y actualizar el estado local
      watch(mainStore.area, (newValue) => {
        area.value = newValue
      })
  
      return {
        area
      }
    }
  }
  </script>
  