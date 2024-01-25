<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card
          class="mb-2"
          title="Parámetros  de ajuste de horarios según las políticas del Área/Facultad"
          variant="outlined"
        >
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="3">
                  <HorarioDias :days="days" @actualizardias="actualizarDias" />
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                    label="Hora Inicio"
                    model-value="12:30:00"
                    type="time"
                    suffix=""
                    v-model="horainicio"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                    label="Hora Fin"
                    model-value="12:30:00"
                    type="time"
                    suffix=""
                    v-model="horafin"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                    label="Intervalo de tiempo"
                    v-model.number="minutosper"
                    type="number"
                    suffix="Minutos"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <v-card-actions class="justify-end">
            <v-btn variant="outlined" class="mr-2"> Descartar </v-btn>
            <v-btn variant="elevated" class="mr-2" disabled=""> Guardar </v-btn>
          </v-card-actions>
        </v-card>

        <v-card
          :title="`Estructura base del horario del Área ${globalAreaSelected.name}`"
          variant="outlined"
        >
          <HorarioGrafico
            :horaini="horainicio"
            :horafin="horafin"
            :minutosper="minutosper"
            :listaDias="days"
            :filas="filas"
            :filaHoras="filaHoras"
          />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
    
    <script>
import HorarioGrafico from './ScheduleGraphic.vue'
import HorarioDias from './ScheduleDays.vue'
import AxiosAM from '@/services/AxiosAM'

export default {
  created() {
    // Lógica que quieres ejecutar al inicio de la carga de la página
    console.log('El componente se ha creado. Puedes realizar acciones aquí.')
    this.recuperarParametros()

    //this.cambiarCantPer()
  },
  name: 'HorarioForm',
  components: {
    HorarioGrafico,
    HorarioDias
  },
  data() {
    return {
      horainicio: '00:00',
      horafin: '00:00',
      minutosper: 0,
      days: [false, false, false, false, false, false, false],
      filas: 0,
      filaHoras: [],

      initialValues: {
        horainicio: '00:00',
        horafin: '00:00',
        minutosper: 0,
        days: [false, false, false, false, false, false, false]
      }

    }
  },

  methods: {
    async recuperarParametros() {

      const area = this.globalAreaSelected;

      try {
        let datos = await AxiosAM.get('admin/schedule-parameters/'+area.id);
        console.log(datos)

        let valores = datos.data

        this.horainicio =
          this.fHora(valores.startTimeSchedule[0]) + ':' + this.fHora(valores.startTimeSchedule[1])
        this.horafin =
          this.fHora(valores.endTimeSchedule[0]) + ':' + this.fHora(valores.endTimeSchedule[1])
        this.minutosper = valores.timeIntervalSchedule
        this.days = [
          valores.mondaySchedule,
          valores.tuesdaySchedule,
          valores.wednesdaySchedule,
          valores.thursdaySchedule,
          valores.fridaySchedule,
          valores.saturdaySchedule,
          valores.sundaySchedule
        ]
        //this.cambiarCantPer();
      } catch (error) {
        console.error('Error getting schedules', error)
      }
    },

    fHora(numero) {
      return numero < 10 ? '0' + numero : numero
    },

    actualizarDias(dias) {
      this.days = dias
    },

    cambiarCantPer() {
      let minListIni = this.horainicio.split(':')
      let minutosIni = parseInt(minListIni[0]) * 60 + parseInt(minListIni[1])

      let minListFin = this.horafin.split(':')
      let minutosFin = parseInt(minListFin[0]) * 60 + parseInt(minListFin[1])

      let diferencia = minutosFin - minutosIni
      if (diferencia > 0 && this.minutosper > 0) {
        if (diferencia >= this.minutosper) {
          let periodos = parseInt(diferencia / this.minutosper)
          this.filas = periodos

          let filaHoraAux = [this.horainicio]
          let cont = minutosIni

          for (let i = 0; i < periodos; i++) {
            cont = cont + this.minutosper

            let horas = parseInt(cont / 60)
            let minutos = parseInt(cont % 60)

            let filaString =
              (horas > 9 ? horas : '0' + horas) + ':' + (minutos > 9 ? minutos : '0' + minutos)
            filaHoraAux.push(filaString)
          }

          this.filaHoras = filaHoraAux
        } else {
          this.filas = 0
          this.filaHoras = [this.horainicio]
        }
      } else {
        this.filas = 0
        this.filaHoras = [this.horainicio]
      }
    }
  },

  watch: {
    minutosper: {
      handler: function (nuevo, oldVal) {
        this.cambiarCantPer()
      },
      deep: true
    },

    horainicio: {
      handler: function (nuevo, oldVal) {
        this.cambiarCantPer()
      },
      deep: true
    },

    horafin: {
      handler: function (nuevo, oldVal) {
        this.cambiarCantPer()
      },
      deep: true
    }
  }
}
</script>
    