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
      <ClassesTableForm :carrera="carreraSel" :gestion="gestion"/>
    </v-row>
  </v-container>
</template>

<script>
import ClassesTableForm from '../../../components/admin/manageclasses/ClassesTableCrudForm.vue'

export default {
  created() {
    this.gestion = this.getYearToday()
    this.gestiones = this.getLastYears(this.gestion, 4)

    this.listAreas()
  },

  data: () => ({
    gestion: null,
    gestiones: [],

    carreraSel: null,
    carrerasList: []
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
    }
  },

  components: {
    ClassesTableForm
  }
}
</script>
