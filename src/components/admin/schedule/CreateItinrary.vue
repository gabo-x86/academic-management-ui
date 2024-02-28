<script setup>
import { useForm, useField } from 'vee-validate'
import { onMounted, ref } from 'vue'
import * as yup from 'yup'
import { useItineraryStore } from '@/stores/admin/schedule/itineraryStore'
import { useCareerStore } from '@/stores/admin/configgeneral/careerStore'

const itineraryStore = useItineraryStore()
const careerStore = useCareerStore()
const props = defineProps(['dialog', 'area'])
const emit = defineEmits(['close-dialog'])
const schema = yup.object().shape({
  nombre: yup.string().required(),
  carrera: yup.string().required()
})
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema
})
const name = useField('nombre', schema)
const career = useField('carrera', schema)

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const itinerary = {
    name: values.nombre,
    careerId: values.carrera
  }
  await itineraryStore.saveItinerary(itinerary)
  resetForm()
  emit('close-dialog')
})
const closeDialog = () => {
  resetForm()
  emit('close-dialog')
}
onMounted(async () => {
  if (props.area) {
    await careerStore.getCareers(props.area)
  }
})
</script>

<template>
  <v-dialog v-model="props.dialog" persistent width="40vw">
    <v-card>
      <v-card-title>
        <span class="text-h5">Añadir Itinerario</span>
      </v-card-title>
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
              :items="careerStore.careers"
              label="Carrera*"
              :item-title="'name'"
              :item-value="'id'"
              required
              v-model="career.value.value"
              :error-messages="career.errorMessage.value"
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