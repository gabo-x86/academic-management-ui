<template>
  <v-container>
    {{ areaData }}
    {{ carrerasData }}
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="6">
            <v-select v-model="carreraSel" :items="carrerasList" label="Carrera" item-text="id"></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="gestion" :items="gestiones" label="Gestión Académica"></v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <ClassesTableForm :carrera="carreraSel" :gestion="gestion" />
    </v-row>
  </v-container>
</template>

<script>
import { useMainStore } from '@/stores/MainStore'
import ClassesTableForm from '../../../components/admin/manageclasses/ClassesTableCrudForm.vue'
import { watch } from 'vue'
import { useCareerStore } from '@/stores/admin/configgeneral/careerStore'

export default {
  created() {
    this.gestion = this.getYearToday()
    this.gestiones = this.getLastYears(this.gestion, 4)

    this.listAreas()
  },

  setup() {
    const mainStore = useMainStore()

    return {
      areaData: mainStore.area
    }
  },

  data: () => ({
    gestion: null,
    gestiones: [],

    carreraSel: null,
    carrerasList: [],

    carrerasData:[]
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

    async listAreas(idArea) {
      const { careers, getCareers } = useCareerStore() // Obtiene las carreras y el método getCareers del store
      await getCareers(idArea) // Ajusta esto según cómo obtengas el areaId en tu aplicación

      let list = [];
      for(let i=0;i<careers.length; i++){
        list.push(careers[i].name)
      }

      //['Ing de sistemas', 'Ing Comercial']
      this.carreraSel = list[0]
      this.carrerasList = list

      this.carrerasData = careers;
    },

    verificarAreaSel(nuevo) {

      this.carreraSel = null;
      this.carrerasList = [];

      if (nuevo !== null) {
        if (nuevo.areaId !== null) {
          this.listAreas(nuevo.areaId)
        }
      }
    }
  },

  components: {
    ClassesTableForm
  },

  watch: {
    areaData: {
      handler: function (nuevo, oldVal) {
        this.verificarAreaSel(nuevo)
      },
      deep: true
    }
  }
}
</script>
