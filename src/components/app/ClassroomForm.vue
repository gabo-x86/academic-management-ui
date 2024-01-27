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
        <div class="d-flex flex-row-reverse">
          <v-btn
              class="mx-9 my-4"
              prepend-icon="mdi-plus"
              color="blue"
              width="200"
              height="50"
              v-bind="props"
          >
            Crear Nuevo
          </v-btn>
        </div>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Crear Aula</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Nombre*"
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="6"
              >
                <v-text-field
                    label="Sigla*"
                    hint="Por ejemplo: 617, INFLAB o 692F"
                    persistent-hint
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="6"
              >
                <v-select
                    :items="['Aula', 'Laboratorio', 'Auditorio']"
                    label="Tipo*"
                    required
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-text-field
                    label="Dirección*"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                    :items="['Facultad de Ciencia y Tecnologia', 'Facultad de Ciencia Económica']"
                    label="Facultad*"
                    required
                ></v-select>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
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
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>

</style>