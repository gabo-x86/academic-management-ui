<template>
  <v-data-table
    items-per-page-text="Elementos por página:"
    page-text="{0}-{1} de {2}"
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'id', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ 'Clases de ' + "carrera.name" + ' ' + "gestion.year" }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <create-classes-group-dialog @agregar="agregarElemento" :areaId="areaId" />
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close"> Cancel </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        size="small"
        class="me-2"
        prepend-icon="mdi-pencil"
        variant="text"
        @click="editItem(item)"
      >
        Editar
      </v-btn>
      <v-btn size="small" prepend-icon="mdi-delete" variant="text" @click="deleteItem(item)">
        Eliminar
      </v-btn>
    </template>

    <template v-slot:item.horarios="{ item }">
      <SimpleListDivider :itemList="genHorarioString(item)" />
    </template>

    <template v-slot:item.aulas="{ item }">
      <SimpleListDivider :itemList="genAulaString(item)" />
    </template>

    <template v-slot:item.docentes="{ item }">
      <SimpleListDivider :itemList="genDocenteString(item)" />
    </template>

    <template v-slot:no-data>
      <!--<v-btn color="primary" @click="initialize"> Reset </v-btn>-->
      <p>No existen datos disponibles en este momento</p>
    </template>
  </v-data-table>

  <v-btn color="primary" variant="text" @click="generarDatosRedirect">
    Generar Clases desde itinerario</v-btn
  >
</template>

<script>
import SimpleListDivider from '@/components/app/SimpleListDivider.vue'
import CreateClassesGroupDialog from './CreateClassesGroupDialog.vue'
import AxiosAM from '@/services/AxiosAM'

export default {
  data: () => ({
    //{"id":39,"level":1,"subjectName":"Introduccion a la Programacion","subjectInitials":"Intro Prog","groupIdentifier":"CGOR2N2","remark":"Clase de Geometría Orgánica","listScheduleDto":[{"id":70,"dayOfWeek":"FRIDAY","startTime":[8,0],"endTime":[10,0],"classroomName":"Laboratorio de Informática","classroomInitials":"INFLAB","professorFullName":"No esta asignado aun."}
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: 'Nro',
        align: 'start',
        sortable: false,
        key: 'name'
      },
      { title: 'NOMNBRE ASIGNATURA', key: 'remark' },
      { title: 'GRUPO', key: 'groupIdentifier' },
      { title: 'HORARIO', key: 'horarios', sortable: false },
      { title: 'AULA', key: 'aulas', sortable: false },
      { title: 'DOCENTE ASIGNADO', key: 'docentes', sortable: false },
      { title: 'OPCIONES', key: 'actions', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      curriculumId: 0,
      subjectId: 0,
      identifier: 'ID',
      remark: 'NA',
      listScheduleDto: []
    },
    defaultItem: {
      curriculumId: 0,
      subjectId: 0,
      identifier: 'ID',
      remark: 'NA',
      listScheduleDto: []
    }
  }),

  components: {
    CreateClassesGroupDialog,
    SimpleListDivider
  },

  props: {
    carrera: String,
    gestion: Number,
    areaId: Number,
    listData: Array
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },

    listData: {
      handler: function (nuevo, oldVal) {
        this.desserts = nuevo  
      },
      deep: true
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    agregarElemento(elemento) {
      this.editedItem = elemento
      this.save()
    },

    genHorarioString(item) {
      let res = []
      for (let i = 0; i < item.listScheduleDto.length; i++) {
        res.push(
          item.listScheduleDto[i].dayOfWeek.substring(0, 2) +
            ' ' +
            item.listScheduleDto[i].startTime +
            ' - ' +
            item.listScheduleDto[i].startTime
        )
      }

      return res
    },

    genAulaString(item) {
      let res = []
      for (let i = 0; i < item.listScheduleDto.length; i++) {
        /*let dataClassroom;
        try {
          const { status, data } = await AxiosAM.get(
            `/admin/areas/${this.areaId.areaId}/classrooms/${item.listScheduleDto[i].classroomId}`
          )
          if (status === 200) {
            dataClassroom = data
          }
        } catch (error) {
          console.error('Error getting classroom: ', error)
        }*/

        //{"id":39,"level":1,"subjectName":"Introduccion a la Programacion","subjectInitials":"Intro Prog","groupIdentifier":"CGOR2N2","remark":"Clase de Geometría Orgánica","listScheduleDto":[{"id":70,"dayOfWeek":"FRIDAY","startTime":[8,0],"endTime":[10,0],"classroomName":"Laboratorio de Informática","classroomInitials":"INFLAB","professorFullName":"No esta asignado aun."}

        res.push(String(item.listScheduleDto[i].classroomName))
      }

      return res
    },

    genDocenteString(item) {
      let res = []
      for (let i = 0; i < item.listScheduleDto.length; i++) {
        /*let dataClassroom;
        try {
          const { status, data } = await AxiosAM.get(
            `/admin/areas/${this.areaId.areaId}/classrooms/${item.listScheduleDto[i].classroomId}`
          )
          if (status === 200) {
            dataClassroom = data
          }
        } catch (error) {
          console.error('Error getting classroom: ', error)
        }*/

        res.push(String(item.listScheduleDto[i].professorFullName))
      }

      return res
    },

    generarDatosRedirect() {
      this.$router.push('manage-classes/generate')
    },

    initialize() {
      this.desserts = this.listData

      /*this.desserts = [
        {
          curriculumId: 1,
          subjectId: 1,
          identifier: 'CGOR2N2',
          remark: 'Clase de Geometría Orgánica',
          listScheduleDto: [
            {
              dayOfWeek: 'LUNES',
              startTime: '08:00',
              endTime: '10:00',
              professorId: 123,
              assistant: 'Juan Pérez',
              classroomId: 1,
              groupItineraryId: 1
            },
            {
              dayOfWeek: 'VIERNES',
              startTime: '09:00',
              endTime: '11:00',
              professorId: 456,
              assistant: 'María González',
              classroomId: 2,
              groupItineraryId: 1
            }
          ]
        },

        {
          curriculumId: 2,
          subjectId: 3,
          identifier: 'ALG1A2',
          remark: 'Álgebra I Avanzada',
          listScheduleDto: [
            {
              dayOfWeek: 'MARTES',
              startTime: '10:00',
              endTime: '12:00',
              professorId: 789,
              assistant: null,
              classroomId: 201,
              groupItineraryId: 2
            },
            {
              dayOfWeek: 'JUEVES',
              startTime: '10:00',
              endTime: '12:00',
              professorId: 789,
              assistant: null,
              classroomId: 201,
              groupItineraryId: 2
            }
          ]
        }
      ]*/
      /*this.desserts = [
        {
          id: 1,
          level: 1,
          subjectName: 'Matemáticas',
          subjectInitials: 'MAT',
          groupIdentifier: 'A',
          remark: 'Curso básico de matemáticas',
          listScheduleDtoDto: [
            {
              id: 1,
              dayOfWeek: 'Lunes',
              startTime: {
                hour: 8,
                minute: 0,
                second: 0,
                nano: 0
              },
              endTime: {
                hour: 10,
                minute: 0,
                second: 0,
                nano: 0
              },
              classroomName: 'Aula 101',
              classroomInitials: 'A101',
              professorFullName: 'Juan Pérez'
            }
            // Otros horarios para esta materia...
          ]
        },
        {
          id: 2,
          level: 1,
          subjectName: 'Historia',
          subjectInitials: 'HIS',
          groupIdentifier: 'B',
          remark: 'Curso introductorio de historia',
          listScheduleDtoDto: [
            {
              id: 2,
              dayOfWeek: 'Miércoles',
              startTime: {
                hour: 9,
                minute: 0,
                second: 0,
                nano: 0
              },
              endTime: {
                hour: 11,
                minute: 0,
                second: 0,
                nano: 0
              },
              classroomName: 'Aula 102',
              classroomInitials: 'A102',
              professorFullName: 'María González'
            }
            // Otros horarios para esta materia...
          ]
        }
      ]*/

      /*this.desserts = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ]*/
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>