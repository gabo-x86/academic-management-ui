<!--<template>
  <p>{{ item }}</p>
  <v-autocomplete
    :label="label"
    v-model="item"
    :items="itemList"
    @input="seleccionarElemento"
  ></v-autocomplete>
</template>

<script>
export default {
  emits: ['guardarSel'],
  data() {
    return {
      item: null
    }
  },

  computed: {
    itemList() {
      // Mapear la lista para obtener solo los nombres de las carreras
      return this.lista.map(item => item[this.name])
    }
  },

  methods: {
    seleccionarElemento() {
      console.log('Seleccionar elemento:', this.item);
      // Encuentra el índice del elemento seleccionado en la lista
      const indice = this.lista.findIndex(item => item[this.name] === this.item)
      // Si se encuentra el índice, emite el evento con el elemento seleccionado
      if (indice !== -1) {
        this.$emit('guardarSel', this.lista[indice])
        console.log('SeleccionarGGGGGG:', this.lista[indice]);
      }
    }
  },
  
  props: {
    lista: Array,
    name: String,
    label: String
  },

  watch: {
    // Observa cambios en la lista y restablece el valor seleccionado
    lista: {
      handler() {
        this.item = null
      },
      deep: true
    }
  }
}
</script>
-->


<template>
  <v-autocomplete
    :label="label"
    v-model="item"
    :items="itemList"
    @input="seleccionarElemento"
  ></v-autocomplete>
</template>

<script>
export default {
  created() {
    this.recuperarLista()
  },

  data() {
    return {
      itemList: [],
      item: null
    }
  },

  methods: {
    recuperarLista() {
      let list = []
      for (let i = 0; i < this.lista.length; i++) {
        list.push(this.lista[i][this.name])
      }

      if (this.selectionRequired) {
        if (list.length > 0) {
          this.item = list[0]
          this.seleccionarElemento(0)
        }
      }
      this.itemList = list
    },

    seleccionarElemento() {
      //console.log('SELECCCCCCCCCCCCCCCCCCCCC')
      // Encuentra el índice del elemento seleccionado en la lista
      const indice = this.itemList.findIndex((item) => item === this.item)
      // Si se encuentra el índice, realiza las acciones adicionales
      if (indice !== -1) {
        //console.log('Elemento seleccionado:', this.lista[indice])
        this.$emit('guardarSel', this.lista[indice])
      }
    }
  },
  props: {
    lista: Array,
    selectionRequired: Boolean,
    name: String,
    label: String
  },

  watch: {
    lista: {
      handler: function (nuevo, oldVal) {
        this.item = null;
        this.recuperarLista()
      },
      deep: true
    },

    item: {
      handler: function (nuevo, oldVal) {
        this.seleccionarElemento()
      },
      deep: true
    }
  }
}
</script>