<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="20"
    items-per-page-text='Elementos por página:'
    page-text='{0}-{1} de {2}'
  ></v-data-table>
</template>
  
  <script setup>
const headers = [
  { title: 'Nro', key: 'name' },
  { title: 'NOMBRE ASIGNATURA', key: 'species' },
  { title: 'GRUPO', key: 'diet' },
  { title: 'HORARIO', key: 'habitat' },
  { title: 'AULA', key: 'name' },
  { title: 'DOCENTE DESIGNADO', key: 'species' },
  { title: 'OPCIONES', key: 'diet' },
]

const items = [
  {
    name: 'African Elephant',
    species: 'Loxodonta africana',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests'
  }
]
</script>