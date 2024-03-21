<template>
  <v-row justify="end" class="me-3">
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
      <template v-slot:activator="{ props }">
        <v-btn color="primary darken-2" prepend-icon="$plus" v-bind="props" variant="elevated">
          Nuevo Grupo
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Nuevo Grupo</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" @click="dialog = false">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-item>
          {{ listaCurriculums +":::::"}}
          {{ groupStore.listCurriculum }}
          {{ "DATA::" + JSON.stringify(groupStore.datoEdit)}}
          <v-row>
            <v-col cols="12" md="4">
              <search-selector-simple
                label="Malla Curricular*"
                name="name"
                :lista="groupStore.listCurriculum"
                :selectionRequired="false"
                @guardarSel="groupStore.setCurriculumEd"
              />
            </v-col>

            <v-col cols="12" md="4">
              <search-selector-simple
                label="Asignatura*"
                name="name"
                :lista="groupStore.listMaterias"
                :selectionRequired="false"
                @guardarSel="groupStore.setSubjectEd"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="Identificador de Grupo"
                type="String"
                suffix=""
                v-model="groupStore.datoEdit.identifier"
              ></v-text-field>
            </v-col>
          </v-row>

          {{ 'areaID::::::' + areaId.areaId }}
          <classes-table-group :areaId="areaId" />
        </v-card-item>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { useAreaStore } from '@/stores/admin/configgeneral/areaStore'

import ClassesTableGroup from './ClassesTableGroup.vue'
import AxiosAM from '@/services/AxiosAM'
import SearchSelectorSimple from '@/components/app/SearchSelectorSimple.vue'
import { useGroup } from '@/stores/admin/configgeneral/groupStore'
import { ref } from 'vue'

export default {
  created() {
    /*const { areas, getAreas} = useAreaStore() // Obtiene las carreras y el método getCareers del store
    let data = await getAreas(idArea) // Ajusta esto según cómo obtengas el areaId en tu aplicación

      let list = [];
      for(let i=0;i<careers.length; i++){
        list.push(careers[i].name)
      }

      //['Ing de sistemas', 'Ing Comercial']
      this.carreraSel = list[0]
      this.carrerasList = list

      this.carrerasData = careers;*/

    console.log('createclassdesGroup createdddddddddddddd')
    //this.readMaterias()
  },

  setup() {
    
    const groupStore = useGroup()
    const listaCurriculums = ref(groupStore.listCurriculum);

    return {
      listaCurriculums,
      groupStore
    }
  },

  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      identGrupo: '',
      materia: null,
      materiaList: [],
      materiaListData: [],

      editedItem: {
        curriculumId: 0,
        subjectId: 0,
        identifier: 'ID',
        remark: 'NA',
        listSchedule: []
      },

      defaultItem: {
        curriculumId: 0,
        subjectId: 0,
        identifier: 'ID',
        remark: 'NA',
        listSchedule: []
      }
    }
  },

  saveData() {
    this.$emit('agregarHorario', this.editedItem)
    this.dialog = false

    this.editedItem = this.defaultItem
  },

  methods: {
    guardarCurriculumSel(){

    },

    async readMaterias() {
      let res = []
      let materias
      try {
        const { status, data } = await AxiosAM.get(`/admin/areas/${this.areaId.areaId}/subjects`)
        if (status === 200) {
          materias = data
          this.materiaListData = data
          console.log(data, 'MATERIAAAAAAAAAAAAAAS')

          //return { success: true, data: data }
        }
      } catch (error) {
        console.log('error getting academic Period')
      }

      for (let i = 0; i < materias.length; i++) {
        res.push(materias[i].name)
      }

      if (res.length > 0) {
        //this.materia = res[0]
        this.materiaList = res
      }
    }
  },

  components: {
    ClassesTableGroup,
    SearchSelectorSimple
  },

  props: {
    areaId: Number
  }
}
</script>