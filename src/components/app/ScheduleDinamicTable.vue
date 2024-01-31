<template>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.horario="{ item }">
        {{ item.horario }}
      </template>
      <template v-slot:item.lunes="{ item }">
        {{ item.lunes }}
      </template>
      <template v-slot:item.martes="{ item }">
        {{ item.martes }}
      </template>
      <template v-slot:item.miercoles="{ item }">
        {{ item.miercoles }}
      </template>
      <template v-slot:item.jueves="{ item }">
        {{ item.jueves }}
      </template>
      <template v-slot:item.viernes="{ item }">
        {{ item.viernes }}
      </template>
      <template v-slot:item.sabado="{ item }">
        {{ item.sabado }}
      </template>
      <template v-slot:item.domingo="{ item }">
        {{ item.domingo }}
      </template>
    </v-data-table>
  </template>
  
  <script>
  export default {
    data() {
      return {
        headers: [
          { text: 'Horario', value: 'horario' },
          { text: 'Lunes', value: 'lunes' },
          { text: 'Martes', value: 'martes' },
          { text: 'Miércoles', value: 'miercoles' },
          { text: 'Jueves', value: 'jueves' },
          { text: 'Viernes', value: 'viernes' },
          { text: 'Sábado', value: 'sabado' },
          { text: 'Domingo', value: 'domingo' },
        ],
        items: [
          { horario: '8:00 - 9:00', lunes: 'Clase 1', martes: 'Clase 2', miercoles: 'Clase 3', jueves: 'Clase 4', viernes: 'Clase 5', sabado: 'Clase 6', domingo: 'Descanso' },
          { horario: '9:00 - 10:00', lunes: 'Clase 7', martes: 'Clase 8', miercoles: 'Clase 9', jueves: 'Clase 10', viernes: 'Clase 11', sabado: 'Clase 12', domingo: 'Descanso' },
          { horario: '10:00 - 11:00', lunes: 'Clase 13', martes: 'Clase 14', miercoles: 'Clase 15', jueves: 'Clase 16', viernes: 'Clase 17', sabado: 'Clase 18', domingo: 'Descanso' },
          { horario: '11:00 - 12:00', lunes: 'Clase 19', martes: 'Clase 20', miercoles: 'Clase 21', jueves: 'Clase 22', viernes: 'Clase 23', sabado: 'Clase 24', domingo: 'Descanso' },
          { horario: '12:00 - 13:00', lunes: 'Clase 25', martes: 'Clase 26', miercoles: 'Clase 27', jueves: 'Clase 28', viernes: 'Clase 29', sabado: 'Clase 30', domingo: 'Descanso' },
        ],
      };
    },
  };
  </script>
  