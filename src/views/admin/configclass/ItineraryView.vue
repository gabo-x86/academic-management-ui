<script setup>
import { onMounted, ref, watch } from 'vue'
import { useItineraryStore } from '@/stores/admin/schedule/itineraryStore'
import CreateItinerary from '@/components/admin/schedule/CreateItinrary.vue'
import EditItinerary from '@/components/admin/schedule/EditItinerary.vue'
import DeleteItinerary from '@/components/admin/schedule/DeleteItinerary.vue'
import { useMainStore } from '@/stores/MainStore'

const itineraryStore = useItineraryStore()
const mainStore = useMainStore()
const dialogCreate = ref(false)
const dialogEdit = ref(false)
const dialogDelete = ref(false)
const idCurrentItinerary = ref(null)
const headers = ref([
  { title: 'Nombre', align: 'start', key: 'name' },
  { title: 'Carrera', align: 'end', key: 'careerName' },
  { title: 'Acciones', align: 'end', sortable: false, key: 'actions' }
])

watch(
  () => mainStore.area.areaId,
  async (newAreaId) => {
    if (newAreaId !== null) {
      await itineraryStore.getItineraries()
    }
  }
)
onMounted(async () => {
  await itineraryStore.getItineraries()
})
const openDialogCreate = () => {
  dialogCreate.value = true
}
const closeDialogCreate = () => {
  dialogCreate.value = false
}
const openDialogEdit = (id) => {
  idCurrentItinerary.value = id
  dialogEdit.value = true
}
const closeDialogEdit = () => {
  dialogEdit.value = false
}
const openDialogDelete = (id) => {
  idCurrentItinerary.value = id
  dialogDelete.value = true
}
const closeDialogDelete = () => {
  dialogDelete.value = false
}
</script>

<template>
  <h1>Lista de Itinerarios</h1>
  <br />
  <v-row justify="end">
    <v-btn prepend-icon="mdi-plus" color="primary" @click="openDialogCreate">
      <template v-slot:prepend>
        <v-icon color="white"></v-icon>
      </template>
      Nuevo
    </v-btn>
  </v-row>
  <br />
  <create-itinerary
    :dialog="dialogCreate"
    :area="mainStore.area.areaId"
    @close-dialog="closeDialogCreate"
    v-if="dialogCreate"
  ></create-itinerary>
  <edit-itinerary
    :dialog="dialogEdit"
    :idItinerary="idCurrentItinerary"
    @close-dialog-edit="closeDialogEdit"
    v-if="dialogEdit"
  >
  </edit-itinerary>
  <delete-itinerary
    :dialog="dialogDelete"
    :idItinerary="idCurrentItinerary"
    @close-dialog-delete="closeDialogDelete"
  ></delete-itinerary>
  <v-data-table
    :headers="headers"
    :items="itineraryStore.itineraries"
    density="compact"
    item-key="name"
    width="100px"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-row justify="space-around">
        <v-btn variant="text" class="botones-tabla-btn" prepend-icon="mdi-eye-outline" to="/admin/itinerary/list">
          <template v-slot:prepend>
            <v-icon color="black"></v-icon>
          </template>
          Ver
        </v-btn>
        <v-btn
          variant="text"
          class="botones-tabla-btn"
          prepend-icon="mdi-pencil"
          @click="openDialogEdit(item.id)"
        >
          <template v-slot:prepend>
            <v-icon color="black"></v-icon>
          </template>
          Editar
        </v-btn>
        <v-btn
          variant="text"
          class="botones-tabla-btn"
          prepend-icon="mdi-trash-can-outline"
          @click="openDialogDelete(item.id)"
        >
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