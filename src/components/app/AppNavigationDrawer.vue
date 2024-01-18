<script setup>
import { ref } from 'vue'

const drawer = ref(true);
const rail = ref(false);

const items = ref ([
  { text: 'Home', icon: 'mdi-clock', route: '/'},
  { text: 'Areas', icon: 'mdi-account', route: '/admin/areas' },
  { text: 'Carreras', icon: 'mdi-account', route: '/admin/careers' },
  { text: 'Asignaturas', icon: 'mdi-flag', route: '/admin/subjects' },
  { text: 'Parametros de Horario', icon: 'mdi-flag', route: '/admin/schedule' }
]);

const open = ref(['configuration']);
const menuGroupList = ref([
  {
    name: 'Home',
    value: 'home',
    icon: 'mdi-home-city',
    subMenus: []
  },
  {
    name: 'Configuración',
    value: 'configuracion',
    icon: 'mdi-cog-outline',
    subMenus: [
      {
        name: 'Facultades',
        value: 'facultades',
        icon: 'mdi-account',
      },
      {
        name: 'Carreras',
        value: 'carreras',
        icon: 'mdi-account'
      },
      {
        name: 'Asignaturas',
        value: 'asignaturas',
        icon: 'mdi-account'
      },
      {
        name: 'Periodos Académicos',
        value: 'periodos_academicos',
        icon: 'mdi-account'
      },
      {
        name: 'Parametros de Horario',
        value: 'parametros_de_horario',
        icon: 'mdi-account'
      }
    ]
  },
  {
    name: 'Horarios de Clases',
    value: 'horario_de_clases',
    icon: 'mdi-cog-outline',
    subMenus: [
      {
        name: 'Itinerario de Clases',
        value: 'itinerario_de_clases',
        icon: 'mdi-account',
      }
    ]
  }
])
</script>

<template>
  <v-navigation-drawer v-model="drawer" :rail="rail"
                       permanent @click="rail = false">
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="John Leider" nav>
      <template v-slot:append>
        <v-btn variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact">
      <v-list-subheader>SELECT AREA</v-list-subheader>

      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
        router :to="item.route"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text">
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>