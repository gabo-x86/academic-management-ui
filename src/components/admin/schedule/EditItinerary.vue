<script setup>
import { onMounted, ref } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useItineraryStore } from '@/stores/admin/schedule/itineraryStore'

const itineraryStore = useItineraryStore()
const props = defineProps(['dialog', 'idItinerary'])
const emit = defineEmits(['close-dialog-edit'])
const formEdit = ref(null)
const schema = yup.object().shape({
  nombre: yup.string().required(),
  carrera: yup.string()
})
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema
})
const name = useField('nombre', schema)
const career = useField('carrera', schema)

const onSubmitEdit = handleSubmit(async (values, { resetForm }) => {
  const itinerary = {
    name: values.nombre,
    careerId: values.carrera
  }
  await itineraryStore.putItinerary(itinerary)
  resetForm()
  emit('close-dialog-edit')
})
const closeDialog = () => {
  resetForm()
  emit('close-dialog-edit')
}
onMounted(async () => {
  await itineraryStore.getItineraryById(props.idItinerary)
  resetForm({
    values: {
      nombre: itineraryStore.currentItinerary.name,
      carrera: itineraryStore.currentItinerary.careerId
    }
  })
})
</script>

<template>
  <v-dialog v-model="props.dialog" persistent width="40vw">
    <v-card>
      <v-card-title>
        <span class="text-h5">Editar Itinerario</span>
      </v-card-title>
      <v-form @submit.prevent="onSubmitEdit" ref="formEdit">
        <v-card-text>
          <v-container>
            <v-text-field
              label="Nombre*"
              v-model="name.value.value"
              :error-messages="name.errorMessage.value"
            ></v-text-field>
            <v-select
              :items="[itineraryStore.currentItinerary]"
              label="Carrera*"
              v-model="career.value.value"
              :item-title="'careerName'"
              :item-value="'careerId'"
              readonly
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