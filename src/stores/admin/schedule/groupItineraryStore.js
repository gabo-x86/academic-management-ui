import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import AxiosAM from '@/services/AxiosAM.js'
import {useMainStore} from '@/stores/MainStore.js'

const mainStore= useMainStore()
let pathItineraryResource=`/admin/areas/-1/itineraries`;

export const useGroupItinerary=defineStore('groupItineraryStore', ()=>{
  watch(()=>mainStore.area.areaId, async (newAreaId)=>{
    if(newAreaId !==null){
      pathItineraryResource=`/admin/areas/${newAreaId}/itineraries`
    }
  })

  }
)
