import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosAM from '@/services/AxiosAM.js'
import axios from "axios";


let pathItineraryResource=`/admin/areas/1/careers/1/itineraries/1/itinerary-groups`

export const useItineraryGroupStore=defineStore('groupItineraryStore', ()=>{

  const itineraryGroups =ref([]);
  const currentItineraryGroup = ref(null)


  async function getInineraryGroups(careerId, itineraryId){
    try {
      const {status, data} = await AxiosAM.get("/admin/areas/1/careers/"+careerId+"/itineraries/"+itineraryId+"/itinerary-groups")
      if(status===200){
        itineraryGroups.value=data
        return{ success:true, data: data}
      }
    }catch (error){
      console.log('error getting itinerary-groups');
    }
  }

  async  function getInineraryGroupById(idItinerarGroup){
    try {
      const {status, data}= await AxiosAM.get(pathItineraryResource+"/"+idItinerarGroup)
      if (status===200){
        currentItineraryGroup.value=data
        return{ success:true, data:data}
      }
    }catch (error){
      console.log('error get IdItinerarGroup ')
    }
  }
  async function createItineraryGroup(areaId,careerId,itineraryId,itineraryGroup){
    try {
      const {status, data }= await AxiosAM.post(`/admin/areas/${areaId}/careers/${careerId}/itineraries/${itineraryId}/itinerary-groups`, itineraryGroup)
      if (status===201){
        itineraryGroups.value.splice(0,0,data)
        //alert("¡Éxito! Grupo creado exitosamente.");
        return{ success:true, data:data }
      }
    }catch (error) {
      console.error('error save itinerarGroup',error)
      alert("No se pudo crear el grupo porque nuestra carrera no tiene mismo materia. Por favor, inténtalo de nuevo.")
      return { error:true, success:false, data:null}
    }
  }
  async function deleteItinerarGroup(idItinerarGroup){
    try {
      const {status, data} = await AxiosAM.delete(pathItineraryResource+"/"+idItinerarGroup)
      if (status===204) {
        //alert("¡Éxito! Grupo eliminado exitosamente.");
        return{ success:true, data:data}
      }
    }catch (error) {
      console.log('error delete idItinerarGroup',error)
      return {  error:true, success:false, data:null}
    }
  }


  async function getSuggestedIdentifier(areaID, careerId, itineraryId, subjectId, curriculumId) {
    console.log('Sending data to API:');
    console.log('areaID:', areaID);
    console.log('careerId:', careerId);
    console.log('itineraryId:', itineraryId);
    console.log('subjectId:', subjectId);
    console.log('curriculumId:', curriculumId);
    try {
      const response = await AxiosAM.get(`/admin/areas/${areaID}/careers/${careerId}/itineraries/${itineraryId}/itinerary-groups/suggest-group-identifier?subjectId=${subjectId}&curriculumId=${curriculumId}`);
      console.log('url busca:'+'/admin/areas/'+areaID+'/careers/'+careerId+'/itineraries/'+itineraryId+'/itinerary-groups/suggest-group-identifier?subjectId='+subjectId+'&curriculumId='+curriculumId+'}');
      console.log('url busca:'+response.data);
      return response.data; // Suponiendo que los datos están en response.data
    } catch (error) {
      console.error('Error al obtener el identificador sugerido:', error);
      return null; // O cualquier valor predeterminado para los datos
    }
  }





  return{getInineraryGroups, getInineraryGroupById, createItineraryGroup, deleteItinerarGroup, itineraryGroups, currentItineraryGroup, getSuggestedIdentifier}
    //  return{getInineraryGroups, getInineraryGroupById, createItineraryGroup, deleteItinerarGroup, itineraryGroups, currentItineraryGroup}
  }
)
