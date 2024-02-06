import { ref  } from 'vue'
import { defineStore } from 'pinia'
import AxiosAM from '@/services/AxiosAM.js'

const pathItineraryResource="/admin/areas/1/itineraries";

export const useItineraryStore =defineStore('itineraryStore',()=>{
    
    const itineraries = ref([]);

  async function getItineraries() {
    try {
      const { status, data } = await AxiosAM.get(pathItineraryResource);
      if (status === 200) {
        itineraries.value = data;
      }
    } catch (error) {
      // handle error
      console.log('error getting itineraries');
    }
  }

 

  async function saveItinerary(itinerary) {
    try {
      const { status, data } = await AxiosAM.post(pathItineraryResource,itinerary);
    
    } catch (error) {
      console.log('error save itinerary');
    }
  }

   return { itineraries, getItineraries,saveItinerary }
})