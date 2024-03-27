<script setup>
const props = defineProps(['dialog'])
const emit = defineEmits(['close-dialog'])
const closeDialog = () => {
  emit('close-dialog')
}
</script>

<template>
  <v-dialog v-model="props.dialog" persistent class="mx-auto my-16"
            min-width="500"
            max-width="600">
    <v-card>
      <v-card-title>
        <span class="text-h5">Añadir Itinerario</span>
      </v-card-title>
      <v-form >
        <v-card-text>
          <v-container>
            <v-select
                label="Periodo"
                :items="['plan nuevo 2021', 'plan nuevo 2022', 'plan nuevo 2023']"
                variant="outlined"
            ></v-select>
            <v-row>
              <v-col>
                <v-select
                    label="Dia *"
                    :items="['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']"
                    variant="outlined"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                    label="Hora inicio *"
                    model-value="12:30:00"
                    type="time"
                    suffix="hrs"
                    variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                    label="Hora fin *"
                    model-value="12:30:00"
                    type="time"
                    suffix="hrs"
                    variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <p class="my-4">Seleccione una opción</p>
            <v-radio-group inline>
              <v-radio label="Docente" value="one" class="mx-4"></v-radio>
              <v-radio label="Asistente" value="two" class="mx-4"></v-radio>
              <v-radio label="Por designar" value="three" class="mx-4"></v-radio>
            </v-radio-group>
            <v-select
                label="Docente"
                :items="['Boris Calancha', 'Leticia Blanco', 'Ronaldo Jaldin']"
                variant="outlined"
            ></v-select>
            <v-select
                label="Aula *"
                :items="['INFLAB', '691A', 'AUDIT']"
                variant="outlined"
            ></v-select>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDialog"> Cancelar </v-btn>
          <v-btn type="submit" color="blue-darken-1" variant="text"> Añadir </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>