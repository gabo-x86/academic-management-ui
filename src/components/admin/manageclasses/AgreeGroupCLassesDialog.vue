<template>
  <v-row justify="end" class="me-3">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary darken-2" variant="elevated" prepend-icon="$plus" v-bind="props">
          Añadir
        </v-btn>
      </template>
      <v-card>
        {{ 'areaID::::::' + areaId.areaId }}

        {{ editedItem }}

        {{ classrooms }}

        {{ aulaList }}
        <v-card-title>
          <span class="text-h5">Añadir Horario </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            {{ dataPrueba }}
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  label="Periodo"
                  v-model="editedItem.periodo"
                  :items="periodosList"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-autocomplete
                  label="Día *"
                  v-model="editedItem.dayOfWeek"
                  :items="diasList"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  label="Hora Inicio *"
                  model-value="12:30:00"
                  type="time"
                  suffix="hrs"
                  v-model="editedItem.startTime"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  label="Hora Fin *"
                  model-value="12:30:00"
                  type="time"
                  suffix="hrs"
                  v-model="editedItem.endTime"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-radio-group v-model="editedItem.cargo" inline>
                  <template v-slot:label>
                    <div>Seleccione una <strong>opción</strong></div>
                  </template>
                  <v-radio value="Docente">
                    <template v-slot:label>
                      <div>Docente</div>
                    </template>
                  </v-radio>
                  <v-radio value="Asistente">
                    <template v-slot:label>
                      <div>Asistente</div>
                    </template>
                  </v-radio>
                  <v-radio :value="null">
                    <template v-slot:label>
                      <div>Por designar</div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-autocomplete
                  :disabled="docenteList.length == 0"
                  label="Docente"
                  v-model="editedItem.docente"
                  :items="docenteList"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-autocomplete
                  label="Aula *"
                  v-model="editedItem.classroomId"
                  :items="aulaList"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="saveData">Añadir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
  <script>
import { useMainStore } from '@/stores/MainStore'
import { useAcademicPeriodStore } from '@/stores/admin/configgeneral/academicPeriodStore'
import { useClassroomStore } from '@/stores/admin/configgeneral/classroomStore'
import AxiosAM from '@/services/AxiosAM'

export default {
  created() {
    this.readData()
    console.log('agreegroup iniciado..........', this.areaId.areaId)
  },

  data: () => ({
    /*editedItem: {
      periodo: null,
      dia: null,
      horaInicio: '',
      horaFin: '',
      cargo: null,
      docente: null,
      aula: null
    },

    defaultItem: {
      periodo: null,
      dia: null,
      horaInicio: '',
      horaFin: '',
      cargo: null,
      docente: null,
      aula: null
    },*/

    editedItem:{
      dayOfWeek: '',
              startTime: '00:00',
              endTime: '00:00',
              professorId: 0,
              assistant: '',
              classroomId: 1,
              groupItineraryId: 1
    },

    defaultItem:{
      dayOfWeek: '',
              startTime: '00:00',
              endTime: '00:00',
              professorId: 0,
              assistant: '',
              classroomId: 1,
              groupItineraryId: 1
    },

    dialog: false,

    periodosList: [],
    diasList: [],
    docenteList: [],
    aulaList: [],

    periodosData:[],
    aulaData:[]
  }),

  methods: {
    async readData() {
      this.periodosList = await this.readPeriods() //['1 - Primer Semestre', '2 - Segundo Semestre', 'Invierno', 'Verano']
      this.diasList = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO']
      this.docenteList = []
      this.aulaList = await this.readClassrooms()
    },

    async readPeriods() {
      console.log('ESTOY LEYENDO PERIODOS', this.areaId.areaId)

      let res = []

      let academicPeriods;

      try {
        const { status, data } = await AxiosAM.get(
          `/admin/areas/${this.areaId.areaId}/academic-periods`
        )
        if (status === 200) {
          academicPeriods = data.map((period, index) => ({
            ...period,
            index: index + 1,
            startDate: period.startDate,
            endDate: period.endDate
          }))

          //return { success: true, data: data }
        }
      } catch (error) {
        console.log('error getting academic Period')
      }

      for (let i = 0; i < academicPeriods.length; i++) {
        res.push(academicPeriods[i].name)
      }

      this.periodosData = academicPeriods;

      return res
    },

    async readClassrooms() {
      console.log('ESTOY LEYENDO AULAS', this.areaId.areaId)

      let res = []

      //const {classrooms, getClassrooms} = useClassroomStore() // Obtiene las carreras y el método getCareers del store
      //await getClassrooms(this.areaId.areaId)

      let classrooms

      try {
        const { status, data } = await AxiosAM.get(`/admin/areas/${this.areaId.areaId}/classrooms`)
        if (status === 200) {
          classrooms = data
        }
      } catch (error) {
        console.error('Error getting classroom: ', error)
      }

      for (let i = 0; i < classrooms.length; i++) {
        res.push(classrooms[i].name)
      }

      this.aulaData = classrooms

      return res
    },

    saveData() {
      this.$emit('agregarHorario', this.editedItem)
      this.dialog = false

      this.editedItem = this.defaultItem
    },
  },

  props: {
    areaId: Number
  }
}
</script>