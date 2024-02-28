<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav>
      <template v-slot:append>
        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"/>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list v-model:opened="open" density="compact">
      <v-select
        label="Select Area"
        v-model="selectedArea"
        :items="areasSelect.map(x => x.name)"
      ></v-select>
      <v-list-item prepend-icon="mdi-home" title="Home" value="home" router to="/"/>
      <v-list-group v-for="menuGroup in menuGroupList" :key="menuGroup.value" :value="menuGroup.value">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :prepend-icon="menuGroup.icon" :title="menuGroup.name"></v-list-item>
        </template>
        <v-list-item
          v-for="subMenu in menuGroup.subMenus"
          :key="subMenu.value"
          :value="subMenu.value"
          :title="subMenu.name"
          router :to="subMenu.route"
        ></v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { sharedReload, useMainStore } from '@/stores/MainStore'
import { useAreaStore } from '@/stores/admin/configgeneral/areaStore';

const drawer = ref(true);
const rail = ref(false);
const open = ref(['home']);
const selectedArea = ref();
const areasSelect = ref([]);
const mainStore = useMainStore();
const props = defineProps(['areasSelect']);
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
        route: '/admin/itinerary'
      }
    ]
  }
]);
const areaStore = useAreaStore();

const onAreaSelected = async () => {
  const selectedAreaObject = areasSelect.value.find(area => area.name === selectedArea.value);

  if (selectedAreaObject) {
    mainStore.setAreaId(selectedAreaObject.id);
    sharedReload.value = true;
  }
};

watch(selectedArea, () => {
  onAreaSelected();
});

onMounted(async () => {
  await areaStore.getAreas();
  areasSelect.value = areaStore.areas.map(area => ({
    id: area.id,
    name: area.name
  }));
});
</script>
<style scoped>

</style>