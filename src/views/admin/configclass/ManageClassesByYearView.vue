<template>
  <v-container>
    <v-row>
      <p>{{ JSON.stringify(groupStore.listGroup.length)}}</p>
      <p>{{ JSON.stringify(groupStore.carreraSel)}}</p>
      <p>{{ JSON.stringify(groupStore.academicSel)}}</p>

      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="6">
            <search-selector-simple
              label="Carrera"
              name="name"
              :lista="carreras"
              :selectionRequired="false"
              @guardarSel="groupStore.setCarrera"
            />
          </v-col>
          <v-col cols="12" md="6">
            <search-selector-simple
              label="Gestion Academica"
              name="name"
              :lista="academicPeriods"
              :selectionRequired="false"
              @guardarSel="groupStore.setPeriodo"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <ClassesTableForm :listData="groupStore.listGroup" :carrera="groupStore.carreraSel" :gestion="groupStore.academicSel" :areaId="groupStore.areaSel" />
    </v-row>
  </v-container>
</template>

<script>
import { useMainStore } from '@/stores/MainStore'
import ClassesTableForm from '../../../components/admin/manageclasses/ClassesTableCrudForm.vue'
import { watch } from 'vue'
import { useCareerStore } from '@/stores/admin/configgeneral/careerStore'
import SearchSelectorSimple from '@/components/app/SearchSelectorSimple.vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useAcademicPeriodStore } from '@/stores/admin/configgeneral/academicPeriodStore'
import { useGroup } from '@/stores/admin/configgeneral/groupStore'

export default {
  setup() {
    const mainStore = useMainStore()
    const area = ref(mainStore.area)

    const carreras = ref([])
    const careerStore = useCareerStore()

    const academicPeriods = ref([])
    const academicStore = useAcademicPeriodStore()

    const groupStore = useGroup()

    // Observar cambios en el área y consultar carreras cuando el área cambie
    watch(
      () => mainStore.area.areaId,
      async (newAreaId) => {
        if (newAreaId !== null) {
          //await careerStore.getCareers(newAreaId)
          groupStore.setAreaSel(newAreaId)
          await leerDatos(newAreaId)
        }
      }
    )

    watch(
      () => careerStore.careers,
      (newCareers) => {
        carreras.value = newCareers
      }
    )

    watch(
      () => academicStore.academicPeriods,
      (newCareers) => {
        academicPeriods.value = newCareers
      }
    )

    watch(mainStore.area, (newValue) => {
      area.value = newValue
    })

    onMounted(async () => {
      if (area.value.areaId !== null) {
        //await careerStore.getCareers(area.value.areaId)
        await leerDatos(area.value.areaId)

        //carreras.value = careerStore.careers
      }
    })

    async function leerDatos(area) {
      groupStore.setDefaultInicial()

      await careerStore.getCareers(area)
      await academicStore.listAcademicPeriodByArea(area)
    }

    return {
      area,
      carreras,
      academicPeriods,
      groupStore
    }
  },

  data: () => ({}),

  methods: {
    /*getYearToday() {
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

      let list = []
      for (let i = 0; i < careers.length; i++) {
        list.push(careers[i].name)
      }

      //['Ing de sistemas', 'Ing Comercial']
      this.carreraSel = list[0]
      this.carrerasList = list

      this.carrerasData = careers
    },

    verificarAreaSel(nuevo) {
      this.carreraSel = null
      this.carrerasList = []

      if (nuevo !== null) {
        //if (nuevo.areaId !== null) {
        this.listAreas(nuevo)
        //}
      }
    }*/
  },

  components: {
    ClassesTableForm,
    SearchSelectorSimple
  },

  watch: {
    /*areaData: {
      handler: function (nuevo, oldVal) {
        this.verificarAreaSel(nuevo.areaId)
      },
      deep: true
    }*/
  }
}
</script>
