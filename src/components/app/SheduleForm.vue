<!--
<v-select
                      :disabled="!isAlmuerzo"
                      v-model="almuerzoIni"
                      :items="almuerzoIniItems"
                      label="Hora Inicio"
                    ></v-select>
-->
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="justify-end p-2">
          <v-btn variant="outlined" class="mr-2"> Descartar </v-btn>
          <v-btn variant="elevated" class="mr-2" disabled=""> Guardar Cambios</v-btn>
        </v-row>

        <v-row>
          <v-col cols="12" md="8">
            <v-card title="Parámetros" variant="outlined" color="indigo-darken-3">
              <v-card-item>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Hora Inicio"
                      model-value="12:30:00"
                      type="time"
                      suffix=""
                      v-model="horainicio"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Hora Fin"
                      model-value="12:30:00"
                      type="time"
                      suffix=""
                      v-model="horafin"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Intervalo de tiempo"
                      v-model.number="minutosper"
                      type="number"
                      suffix="Minutos"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Entre Periodos"
                      v-model.number="entrePer"
                      type="number"
                      suffix="Minutos"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card variant="outlined" color="indigo-darken-3">
              <v-card-title> Almuerzo </v-card-title>
              <v-card-text v-if="isAlmuerzo">
                {{ itemAlmuerzo[0] }} a {{ itemAlmuerzo[1] }}
              </v-card-text>

              <v-card-text v-else> Sin agregar </v-card-text>

              <v-card-actions>
                <ScheduleLunchDialog
                  v-if="!isAlmuerzo"
                  :horaDefault="almuerzoIni"
                  :lista="filaHoras"
                  @actualizarDatosLunch="agregarAlmuerzo"
                />
                <v-row v-else justify="center">
                  <v-btn class="ma-2" color="red" variant="tonal" @click="cancelarAlmuerzo">
                    Descartar
                    <v-icon end icon="mdi-cancel"></v-icon>
                  </v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" v-if="cargandoDatos">
            <v-skeleton-loader class="mx-auto" elevation="12" type="table-heading, table-tbody">
            </v-skeleton-loader>
          </v-col>

          <HorarioGrafico
            v-else
            :horaini="horainicio"
            :horafin="horafin"
            :minutosper="minutosper"
            :listaDias="days"
            :filas="filas"
            :filaHoras="filaHoras"
          />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
    
    <script>
import HorarioGrafico from './ScheduleGraphic.vue'
import HorarioDias from './ScheduleDays.vue'
import ScheduleLunch from './ScheduleLunch.vue'
import ScheduleLunchDialog from './ScheduleLunchDIalog.vue'

import ScheduleDaySelection from './ScheduleDaySelection.vue'

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
    HorarioDias,
    ScheduleDaySelection,
    ScheduleLunch,
    ScheduleLunchDialog
  },
  data() {
    return {
      cargandoDatos: false,
      timerCargando: null,
      dialog: false,
      horainicio: '00:00',
      horafin: '00:00',
      minutosper: 0,
      entrePer: 0,
      days: [false, false, false, false, false, false, false],
      filas: 0,
      filaHoras: [],

      isAlmuerzo: false,
      almuerzoIni: null,
      minutosAlmuerzo: 0,
      itemAlmuerzo: [],

      initialValues: {
        horainicio: '00:00',
        horafin: '00:00',
        minutosper: 0,
        days: [false, false, false, false, false, false, false]
      }
    }
  },

  methods: {
    cancelarAlmuerzo() {
      this.isAlmuerzo = false
      this.almuerzoIni = null
      this.minutosAlmuerzo = 0
    },

    agregarAlmuerzo(iniLunch, minutos) {
      this.isAlmuerzo = true
      this.almuerzoIni = iniLunch
      this.minutosAlmuerzo = minutos

      /*for (let i = 0; i < this.filaHoras.length; i++) {
        if (this.filaHoras[i][2] === true) {
          this.itemAlmuerzo = this.filaHoras[i]
        }
      }*/
    },

    async recuperarParametros() {
      const area = this.globalAreaSelected

      try {
        let datos = await AxiosAM.get('admin/schedule-parameters/' + area.id)
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

    hourToMinutes(texto) {
      let minListIni = texto.split(':')
      return parseInt(minListIni[0]) * 60 + parseInt(minListIni[1])
    },

    timeToString(hour, minutes) {
      return this.fHora(hour) + ':' + this.fHora(minutes)
    },

    minutesToHour(minutes) {
      let horas = parseInt(minutes / 60)
      let minutos = parseInt(minutes % 60)

      return this.timeToString(horas, minutos)
    },

    actualizarDias(dias) {
      this.days = dias
    },

    cambiarCantPer() {
      if (this.timerCargando !== null) {
        clearTimeout(this.timerCargando)
      }

      this.cargandoDatos = true

      let minutosIni = this.hourToMinutes(this.horainicio)
      let minutosFin = this.hourToMinutes(this.horafin)

      let diferencia = minutosFin - minutosIni

      if (diferencia > 0 && this.minutosper > 0) {
        if (diferencia >= this.minutosper) {
          let periodos = parseInt(diferencia / this.minutosper)
          //this.filas = periodos

          let filaHoraAux = []
          let cont = minutosIni

          let filasCont = 0
          let cumpleHoraFin = true

          while (cumpleHoraFin) {
            let horaIniString = this.minutesToHour(cont)
            let horaFinString
            let itemAlmuerzo
            let contFinAux

            if (horaIniString !== this.almuerzoIni) {
              contFinAux = cont + this.minutosper
              horaFinString = this.minutesToHour(contFinAux)
              itemAlmuerzo = false

              cont = cont + this.minutosper
            } else {
              itemAlmuerzo = true

              if (this.minutosAlmuerzo > 0) {
                contFinAux = cont + this.minutosAlmuerzo
                horaFinString = this.minutesToHour(contFinAux)
                cont = cont + this.minutosAlmuerzo
              } else {
                contFinAux = cont + this.minutosper
                horaFinString = this.minutesToHour(contFinAux)
                itemAlmuerzo = false

                cont = cont + this.minutosper
              }
            }

            console.log(filaHoraAux, 'ggg..........')

            cumpleHoraFin = contFinAux <= minutosFin

            if (cumpleHoraFin) {
              filaHoraAux.push([horaIniString, horaFinString, itemAlmuerzo])
              if(itemAlmuerzo){
                this.itemAlmuerzo = [horaIniString, horaFinString, itemAlmuerzo];
              }

              //if(itemAlmuerzo){
              // cont = cont + this.minutosAlmuerzo>0?this.minutosAlmuerzo:0;
              //}else{

              //}

              if (this.entrePer > 0) {
                console.log(
                  filaHoraAux[filaHoraAux.length - 2],
                  'GGGGGGGGGGGGGGGGGGGG',
                  filaHoraAux.length - 2
                )

                if (filaHoraAux.length - 2 >= 0) {
                  let valor = filaHoraAux[filaHoraAux.length - 2][2]

                  if (valor === false) {
                    cont = cont + this.entrePer
                  }

                  console.log(
                    filaHoraAux[filaHoraAux.length - 2],
                    'GGGGGGGGGGGGGGGGGGGG',
                    filaHoraAux.length - 2,
                    valor
                  )
                } else {
                  cont = cont + this.entrePer
                }
              }

              filasCont = filasCont + 1
            }
          }

          this.filaHoras = filaHoraAux
          this.filas = filasCont

          this.timerCargando = setTimeout(() => {
            this.cargandoDatos = false
          }, 1000)
        } else {
          this.filas = 0
          this.filaHoras = []

          this.cargandoDatos = false
        }
      } else {
        this.filas = 0
        this.filaHoras = []

        this.cargandoDatos = false
      }
    }
  },

  watch: {
    minutosper: {
      handler: function (nuevo, oldVal) {
        this.cambiarCantPer()
        this.cancelarAlmuerzo();
      },
      deep: true
    },

    minutosAlmuerzo: {
      handler: function (nuevo, oldVal) {
        this.cambiarCantPer()
      },
      deep: true
    },

    horainicio: {
      handler: function (nuevo, oldVal) {
        this.cambiarCantPer()
        this.cancelarAlmuerzo();
      },
      deep: true
    },

    almuerzoIni: {
      handler: function (nuevo, oldVal) {
        this.cambiarCantPer()
      },
      deep: true
    },

    horafin: {
      handler: function (nuevo, oldVal) {
        this.cambiarCantPer()
        this.cancelarAlmuerzo();
      },
      deep: true
    },

    entrePer: {
      handler: function (nuevo, oldVal) {
        this.cambiarCantPer()
        this.cancelarAlmuerzo();
      },
      deep: true
    }
  }
}
</script>
    

<style scoped>
.horario-container {
  overflow-x: auto;
}
</style>