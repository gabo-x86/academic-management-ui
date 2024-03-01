<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="6">
              <v-select v-model="carreraSel" :items="carrerasList" label="Carrera"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="gestion" :items="gestiones" label="Gestión Académica"></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="6">
              <v-select v-model="itinerarioSel" :items="itinerarioList" label="Itinerario"></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <loading-generate/>
      </v-row>

    <v-row justify="center">
        <v-btn color="primary darken-2" variant="elevated">GENERAR</v-btn>
    </v-row> 
    </v-container>
  </template>

<script>
import LoadingGenerate from '@/components/admin/manageclasses/LoadingGenerate.vue'

export default {
  components: { LoadingGenerate },
  created() {
    this.gestion = this.getYearToday()
    this.gestiones = this.getLastYears(this.gestion, 4)

    this.listAreas()
    this.listItinerarios()
  },

  data: () => ({
    gestion: null,
    gestiones: [],

    carreraSel: null,
    carrerasList: [],

    itinararioSel: null,
    itinerarioSel:[],
  }),

  methods: {
    getYearToday() {
      let gestionActual = new Date().getFullYear()
      console.log(gestionActual)
      return gestionActual
    },

    getLastYears(year, count) {
      let list = []
      let cont = year

      for (let i = 0; i < count; i++) {
        list.push(cont)
        cont = cont - 1
      }

      return list
    },

    listAreas() {
      let list = ['Ing de sistemas', 'Ing Comercial']
      this.carreraSel = list[0]
      this.carrerasList = list
    },

    listItinerarios() {
      let list = ['Ing de sistemas', 'Ing Comercial']
      this.itinararioSel = list[0]
      this.itinerarioList = list
    }
  },
}
</script>
