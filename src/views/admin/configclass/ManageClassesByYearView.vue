<template>
  <v-container>
    <v-row>
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
      <ClassesTableForm
        :listData="groupStore.listGroup"
        :carrera="groupStore.carreraSel"
        :gestion="groupStore.academicSel"
        :areaId="groupStore.areaSel"
      />
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

  components: {
    ClassesTableForm,
    SearchSelectorSimple
  }
}
</script>
