<script setup>
  import { ref } from 'vue'

  const dialog=ref(false)
</script>

<template>
  <v-row justify="end" class="">
    <v-dialog
        v-model="dialog"
        persistent
        width="500"
    >

      <template v-slot:activator="{ props }">
          <v-btn
              class="mx-auto ma-0"
              v-bind="props"

          >
            <v-icon icon="mdi-delete"></v-icon>
          </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h6 mx-auto" >
          ¿Está seguro de que elimina el aula?
        </v-card-title>
        <v-card-actions class="mx-auto">
          <v-spacer></v-spacer>
          <v-btn
              color="blue"
              variant="text"
              @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
              color="blue"
              variant="text"
              @click="dialog = false"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>

</style>