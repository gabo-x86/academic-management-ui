import { defineStore } from 'pinia';
import { ref } from 'vue'
import AxiosAM from '@/services/AxiosAM';

const pathCareerResource = '/admin/areas';

export const useItineraryReadStore = defineStore('itinearyReadStore', () => {
  const itineraries = ref([]);
  async function getItineraries(areaId) {//admin/areas/1/itineraries
    try {
      const { status, data } = await AxiosAM.get(`${pathCareerResource}/${areaId}/itineraries`);
      if (status === 200) {
        itineraries.value = data;
        //console.log("LO LEIIIIIIIIIIIIIIIIIII", itineraries)
      }
    } catch (error) {
      console.error('Error getting careers:', error);
    }
  }

  return { itineraries, getItineraries };

});