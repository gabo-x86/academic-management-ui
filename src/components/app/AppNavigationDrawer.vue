<script setup>
import { ref } from 'vue'

const drawer = ref(true);
const rail = ref(false);

const open = ref(['home']);
const menuGroupList = ref([
  {
    name: 'Configuración',
    value: 'configuration',
    icon: 'mdi-cog',
    subMenus: [
      {
        name: 'Facultades',
        value: 'area',
        route: '/admin/areas'
      },
      {
        name: 'Carreras',
        value: 'careers',
        route: '/admin/careers'
      },
      {
        name: 'Asignaturas',
        value: 'subjects',
        route: '/admin/subjects'
      },
      {
        name: 'Parámetros de Horarios',
        value: 'schedule',
        route: '/admin/schedule'
      },
      {
        name:'Aulas',
        value:'classroom',
        route:'/admin/classroom'
      }
    ]
  },
  {
    name: 'Admin Clases',
    value: 'schedule-admin',
    icon: 'mdi-wrench-clock-outline',
    subMenus: [
      {
        name: 'Itinerario de Clases',
        value: 'itinerario',
        route: '/admin/areas'
      }
    ]
  }
]);
</script>

<template>
  <v-navigation-drawer v-model="drawer" :rail="rail"
                       permanent @click="rail = false">
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="John Leider" nav>
      <template v-slot:append>
        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"/>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list v-model:opened="open" density="compact">
      <v-list-subheader>SELECT AREA</v-list-subheader>
      <v-list-item prepend-icon="mdi-home" title="Home" value="home" router to="/"/>
      <v-list-group v-for="menuGroup in menuGroupList" :key="menuGroup.value" :value="menuGroup.value">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="menuGroup.icon"
            :title="menuGroup.name"
          ></v-list-item>
        </template>
        <v-list-item
          v-for="subMenu in menuGroup.subMenus"
          :key="subMenu.value"
          :value="subMenu.value"
          :title="subMenu.name"
          router :to="subMenu.route">
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>