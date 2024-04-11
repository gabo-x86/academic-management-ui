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

  const itinerary={
    itineraryId:ref(1),
    name:ref(null),
    active:ref(null)
  }

  let userRole= 'admin';

  const mutations = {
    setUserRole(role) {
      console.log("inicial"+userRole)
      userRole = role;
      console.log("final"+userRole)
    },
  };

  function setItineraryId(id){
    itinerary.itineraryId.value =id
  }
  return {
    area,
    setAreaId,
    itinerary,
    setItineraryId,
    userRole,
    mutations
  };


});