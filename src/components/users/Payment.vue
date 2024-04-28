<script setup>
import { useForm, useField } from 'vee-validate'
import { onMounted, ref } from 'vue'
import * as yup from 'yup'

const props = defineProps(['dialog'])
const emit = defineEmits(['close-dialog'])

</script>
<template>
    <v-dialog v-model="props.dialog" persistent width="40vw">
      <v-card>

      </v-card>
      <v-card>
        <v-card-title>
          <span class="text-h5">PASARELA DE PAGO</span>
        </v-card-title>
        <p>Datos para el envío de recibo</p>
        <v-form @submit.prevent="onSubmit">
          <v-card-text>
            <v-container>
              <v-text-field
                label="Nombre*"
                v-model="name.value.value"
                :error-messages="name.errorMessage.value"
              >
              </v-text-field>
              <v-select
                @update:modelValue="cargarCurriculums"
                :items="careerStore.careers"
                label="Carrera*"
                :item-title="'name'"
                :item-value="'id'"
                required
                v-model="career.value.value"
                :error-messages="career.errorMessage.value"
              ></v-select>
              <v-select
                :items="curriculumStore.curriculumsByCareer"
                label="Curriculum*"
                :item-title="'name'"
                :item-value="'id'"
                required
                v-model="curriculum.value.value"
                :error-messages="curriculum.errorMessage.value"
              ></v-select>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeDialog"> Cancelar </v-btn>
            <v-btn type="submit" color="blue-darken-1" variant="text"> Guardar </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </template>