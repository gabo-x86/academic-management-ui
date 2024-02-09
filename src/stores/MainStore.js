import { defineStore } from 'pinia';
import { ref } from 'vue';

export const sharedReload = ref(false);
export const useMainStore = defineStore('main', () => {
  const area = {
    areaId: ref(null),
    name: ref(null),
    initials: ref(null),
    active: ref(null),

  };

  function setAreaId(id) {
    area.areaId.value = id;
  }

  return {
    area,
    setAreaId,
  };
});