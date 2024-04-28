<script setup>
import { ref } from 'vue'
import Payment from '@/components/users/Payment.vue';
var step = ref(0)
const dialogPayment = ref(false)

const openDialogPayment=()=>{
  
}

const desserts = [
  {
    number: 1,
    manage: '1/2024',
    career: 'Ingenieria de Sistemas',
    dateMatricula: {start: '12/02/2024', end: '24/02/2024' },
    amountMatricula: 15.0
  }
]
const headers = [
  { title: 'N°', align: 'start', key: 'number' },
  { title: 'Gestión', align: 'start', key: 'manage' },
  { title: 'Carrera', align: 'start', key: 'career' },
  { title: 'Fecha compra matrícula', align: 'start', key: 'dateMatricula' },
  { title: 'Monto', align: 'start', key: 'amountMatricula' },
  { title: 'Pagar matrícula', align: 'start', key: 'actions' }
]


const nextTab = () => {
  if (tab.value === 'option-1') {
    tab.value = 'option-2'
  } else if (tab.value === 'option-2') {
    tab.value = 'option-3'
  }
  // Puedes agregar más condiciones si tienes más pestañas
}
</script>

<template>

  <payment
  :dialog="dialogPayment"
  ></payment>

  <v-container>
    <v-card max-width="1200" variant="flat" class="mx-auto my-16">
      <v-stepper v-model="step">
        <template v-slot:default="{ prev }">
          <v-stepper-header>
            <v-stepper-item
              title="PASO 1 - PAGAR MATRICULA"
              value="1"
              selected-class="selected-step"
              color="white"
            ></v-stepper-item>
            <v-stepper-item
              title="PASO 2 - OBTENER CODIGOS"
              value="2"
              selected-class="selected-step"
              color="white"
            ></v-stepper-item>
            <v-stepper-item
              title="PASO 3 - INSCRIPCION DE MATERIAS"
              value="3"
              color="white"
              selected-class="selected-step"
            ></v-stepper-item>
          </v-stepper-header>

          <v-stepper-window>
            <v-stepper-window-item value="1">
              <v-card title="PAGAR MATRÍCULA" center>
                <v-data-table :headers="headers" :items="desserts" >
                  <template v-slot:[`item.dateMatricula`]="{item}">
                  <p>Desde: {{item.dateMatricula.start }}</p>
                  <p>Hasta: {{item.dateMatricula.end }}</p>
                 </template>
                 <template v-slot:[`item.actions`]>
                  <v-btn color="primary" variant="elevated" @click="openDialogPayment">PAGAR</v-btn>
                 </template>
                </v-data-table>
              </v-card>
              <template v-slot:next>
                  <v-btn type="submit" class="v-stepper__action" @click="next"> Siguiente </v-btn>
                </template>
            </v-stepper-window-item>

            <v-stepper-window-item value="2">
              <span>2</span>
              <v-stepper-actions prev-text="Anterior" @click:prev="prev" disabled="prev">
                <template v-slot:next>
                  <v-btn type="submit" class="v-stepper__action" @click="next"> Siguiente </v-btn>
                </template>
              </v-stepper-actions>
            </v-stepper-window-item>

            <v-stepper-window-item value="3">
              <span>3</span>
              <v-stepper-actions prev-text="Anterior" @click:prev="prev" disabled="prev">
                <template v-slot:next>
                  <v-btn type="submit" class="v-stepper__action" @click="next"> Siguiente </v-btn>
                </template>
              </v-stepper-actions>
            </v-stepper-window-item>
          </v-stepper-window>
        </template>
      </v-stepper>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-stepper-header {
  background: rgba(0, 30, 137, 1);
  color: white;
  font-size: 15px;
}
.selected-step {
  background: rgba(154, 170, 226, 1);
  color: black;
}
</style>