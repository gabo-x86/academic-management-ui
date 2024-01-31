<template>
  <v-select v-model="value" :items="items" chips label="Días laborales" multiple></v-select>
</template>

<script>
export default {
  data: () => ({
    items: ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'],
    value: []
  }),

  created() {
    this.value = this.days;
  },

  watch: {
    value: {
      handler: function (nuevaSel, oldVal) {
        let listaCheck = [];
        for(let i=0;i<this.items.length; i++){
            if(this.value.includes(this.items[i])){
              listaCheck.push(true);
            }else{
              listaCheck.push(false);
            }
        }

        this.emitChange(listaCheck);
      },
      deep: true
    }
  },

  props: {
    days: Array
  },

  methods: {
    emitChange(days) {
      this.$emit("actualizardias", days);
    },
  }
}
</script>