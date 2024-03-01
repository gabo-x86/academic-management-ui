<template>
  <v-data-table
    items-per-page-text="Elementos por página:"
    page-text="{0}-{1} de {2}"
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'horaInicio', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Horarios</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <agree-group-c-lasses-dialog @agregarHorario="agregarElemento" />
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Está seguro que sea eliminar el horario?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">Eliminar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="deleteItem(item)" color="red">
        mdi-close-circle-outline
      </v-icon>
    </template>
    <template v-slot:no-data>
      <!--<v-btn color="primary" @click="initialize"> Reset </v-btn>-->
      <p>No existen datos disponibles en este momento</p>
    </template>
  </v-data-table>

  <v-btn v-if="desserts.length === 0" color="primary" variant="text" @click="generarDatosRedirect">
    Generar Clases desde itinerario</v-btn
  >
</template>

<script>
import AgreeGroupCLassesDialog from './AgreeGroupCLassesDialog.vue'

export default {
  data: () => ({
    dialogDelete: false,
    headers: [
      {
        title: 'Día',
        align: 'start',
        sortable: false,
        key: 'dia'
      },
      { title: 'Horario Inicio', key: 'horaInicio' },
      { title: 'Horario Fin', key: 'horaFin' },
      { title: 'Aula', key: 'aula' },
      { title: 'Docente', key: 'docente' },
      { title: 'Opción', key: 'actions', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      periodo: null,
      dia: null,
      horaInicio: "",
      horaFin: "",
      cargo: null,
      docente: null,
      aula: null
    },
    defaultItem: {
      periodo: null,
      dia: null,
      horaInicio: "",
      horaFin: "",
      cargo: null,
      docente: null,
      aula: null
    }
  }),

  components: {
    AgreeGroupCLassesDialog
  },

  props: {
    carrera: String,
    gestion: Number
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
    }
  },

  created() {
    this.initialize()
  },

  methods: {

    agregarElemento(elemento){
      this.editedItem = elemento;
      this.save();
    },

    generarDatosRedirect() {
      this.$router.push('manage-classes/generate')
    },

    initialize() {
      /*this.desserts = [
        {
          dia: 'Frozen Yogurt',
          horaInicio: 159,
          horaFin: 6.0,
          aula: 24,
          docente: 4.0
        },
        {
          dia: 'Ice cream sandwich',
          horaInicio: 237,
          horaFin: 9.0,
          aula: 37,
          docente: 4.3
        },
        {
          dia: 'Eclair',
          horaInicio: 262,
          horaFin: 16.0,
          aula: 23,
          docente: 6.0
        },
        {
          dia: 'Cupcake',
          horaInicio: 305,
          horaFin: 3.7,
          aula: 67,
          docente: 4.3
        },
        {
          dia: 'Gingerbread',
          horaInicio: 356,
          horaFin: 16.0,
          aula: 49,
          docente: 3.9
        },
        {
          dia: 'Jelly bean',
          horaInicio: 375,
          horaFin: 0.0,
          aula: 94,
          docente: 0.0
        },
        {
          dia: 'Lollipop',
          horaInicio: 392,
          horaFin: 0.2,
          aula: 98,
          docente: 0
        },
        {
          dia: 'Honeycomb',
          horaInicio: 408,
          horaFin: 3.2,
          aula: 87,
          docente: 6.5
        },
        {
          dia: 'Donut',
          horaInicio: 452,
          horaFin: 25.0,
          aula: 51,
          docente: 4.9
        },
        {
          dia: 'KitKat',
          horaInicio: 518,
          horaFin: 26.0,
          aula: 65,
          docente: 7
        }
      ]*/

      this.desserts = [];
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