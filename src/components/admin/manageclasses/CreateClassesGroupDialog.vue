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
            <v-btn variant="text" @click="guardarDatoGroup">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-item>
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

          <classes-table-group :areaId="groupStore.areaId" />
        </v-card-item>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import ClassesTableGroup from './ClassesTableGroup.vue'
import SearchSelectorSimple from '@/components/app/SearchSelectorSimple.vue'
import { useGroup } from '@/stores/admin/configgeneral/groupStore'
import { ref } from 'vue'

export default {
  created() {
  },

  setup() {
    const groupStore = useGroup()
    const listaCurriculums = ref(groupStore.listCurriculum)

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

  methods: {
    guardarDatoGroup() {
      if (this.groupStore.isValidGroupEdit()) {
        this.groupStore.addGroupBD()
        this.editedItem = this.defaultItem
        this.dialog = false
      }
    },

    guardarCurriculumSel() {},

  },

  components: {
    ClassesTableGroup,
    SearchSelectorSimple
  }
}
</script>