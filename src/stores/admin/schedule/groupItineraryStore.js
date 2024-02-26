import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosAM from '@/services/AxiosAM.js'
import {useMainStore} from '@/stores/MainStore.js'

let pathItineraryResource=`/admin/areas/1/careers/1/itineraries/1/itinerary-groups`

export const useItineraryGroupStore=defineStore('groupItineraryStore', ()=>{
  const mainStore= useMainStore()/// <<<-----
  const itineraryGroups =ref([]);
  const currentItinerary = ref(null)
  async function getInineraryGroups(careerId, itineraryId){
    try {
      const {status, data} = await AxiosAM.get("/admin/areas/1/careers/"+careerId+"/itineraries/"+itineraryId+"/itinerary-groups")
      if(status===200){
        itineraryGroups.value=data
        return{ success:true, data: data}
      }
    }catch (error){
      //handle error
      console.log('error getting itinerary-groups');
    }
  }

  async  function getInineraryGroupById(idItinerarGroup){
    try {
      const {status, data}= await AxiosAM.get(pathItineraryResource+"/"+idItinerarGroup)
      if (status===200){
        currentItinerary.value=data
        return{ success:true, data:data}
      }
    }catch (error){
      console.log('error get IdItinerarGroup ')
    }
  }

  //ojos
  async function createInineraryGroup(itineraryGroup){
    try {
      const {status, data }= await AxiosAM.post(pathItineraryResource, itineraryGroup)
      if (status===201){
        itineraryGroups.value.splice(0,0,data)
        return{ success:true, data:data }
      }
    }catch (error) {
      console.log('error save itinerarGroup')
      return { error:true, success:false, data:null}
    }
  }


  async function deleteItinerarGroup(idItinerarGroup){
    try {
      const {status, data} = await AxiosAM.delete(pathItineraryResource+"/"+idItinerarGroup)
      if (status===204) {
        this.getInineraryGroups()
        return{ success:true, data:data}
      }
    }catch (error) {
      console.log('error delete idItinerarGroup')
      return {  error:true, success:false, data:null}
    }
  }


  return{getInineraryGroups, getInineraryGroupById, createInineraryGroup, deleteItinerarGroup, itineraryGroups, currentItinerary}
  }
)
