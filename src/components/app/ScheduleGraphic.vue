<template>
  <v-container>
    <v-alert type="info" title="Horario" variant="tonal">
      <ul>
        <li>Selecciona los días laborales.</li>
        <li>Especifíca los periodos activos.</li>
      </ul>
    </v-alert>
    <Horario :rows="filas" :columns="diasSel.length" :days="diasSelPos" :filaHoras="filaHoras" />
  </v-container>
</template>


      
      <script>
/*Soy el grafico
        <div>
          {{ horaini }}+{{ horafin }}+{{ minutosper }}+{{ diasSel }}+{{ filas }}
        </div>*/

import Horario from './ScheduleTable.vue'

export default {
  created() {
    this.seleccionarDias(this.listaDias)
  },

  name: 'HorarioGrafico',
  data() {
    return {
      diasSel: [],

      diasSelPos: [],
    }
  },
  methods: {
    seleccionarDias(lista) {
      let res = [];
      for(let i=0;i<lista.length;i++){
        if(lista[i]===true){
          res.push(i);
        }
      }

      this.diasSelPos = res;
    }
  },
  props: {
    horaini: String,
    horafin: String,
    minutosper: Number,
    listaDias: Array,
    filas: Number,
    filaHoras: Array
  },
  watch: {
    listaDias: {
      handler: function (lista, oldVal) {
        this.seleccionarDias(lista);
        /*let dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO']
        let res = []
        console.log(lista, 'new................')
        for (let i = 0; i < lista.length; i++) {
          if (lista[i] === true) {
            res.push(dias[i])
          }
        }
        this.diasSel = res*/
      },
      deep: true
    }
  },
  components: { Horario }
}
</script>
      