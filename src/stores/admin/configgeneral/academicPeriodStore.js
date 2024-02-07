import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosAM from '@/services/AxiosAM.js'


const pathAcademicPeriodResource = '/admin/areas'
export const useAcademicPeriodStore = defineStore('academicPeriodStore', () => {
  const academicPeriods = ref([]);
  let areaId= -1;
  const academicPeriod= ref([]);

  async function listAcademicPeriodByArea(areaID) {
    try {
      
        const { status, data } = await AxiosAM.get(`${pathAcademicPeriodResource}/${areaID}/academic-periods`);
        areaId=areaID;
      if (status === 200) {
        academicPeriods.value = data.map((period, index) => ({
          ...period,
          index: index + 1,
          startDate: formatDate(period.startDate, true),
          endDate: formatDate(period.endDate, true),
        }));
      }
    } catch (error) {
      console.log('error getting academic Period');
    }
  }

  async function getAcademicPeriodById(id) {
    try {
      const { status, data } = await AxiosAM.get(`${pathAcademicPeriodResource}/${areaId}/academic-periods/${id}`);
      if (status === 200) {
        academicPeriod.value = data;
      }
    } catch (error) {
      console.log('error getting academic PEriod by id:',error);
    }
  }

  async function createAcademicPeriod(model) {
    try {
      model.areaId=areaId;
      model.startDate=formatDate(model.startDate, false);
      model.endDate=formatDate(model.endDate, false);
        const { status, data } = await AxiosAM.post(`${pathAcademicPeriodResource}/${areaId}/academic-periods`, model, areaId);
      if (status === 200) {
        console.log("CREACION ACADEMIC PERIDO:", data);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  }

  async function editAcademicPeriod(AcademicPeriodDto, id) {
    try {
      AcademicPeriodDto.startDate=formatDate(AcademicPeriodDto.startDate, false)
      AcademicPeriodDto.endDate=formatDate(AcademicPeriodDto.endDate, false)
      const { status, data } = await AxiosAM.put(`${pathAcademicPeriodResource}/${areaId}/academic-periods/${id}`, AcademicPeriodDto, areaId);
  
      if (status === 200) {
        console.log("MODIFICACION  ACADEMIC PERIOD:", data);
      }
    } 
    catch (error) {
      console.error('Error saving career:', error);
    }
  }

  async function deleteAcademicPeriod(academicPeriodId) {
    try {
      const { status, data } = await AxiosAM.delete(`${pathAcademicPeriodResource}/${areaId}/academic-periods/${academicPeriodId}`);
      if (status === 200) {
        console.log("ELIMINAR ACADEMIC PERIOD", data);
      }
    } 
    catch (error) {
      console.error('Error saving career:', error);
    }
  }

  const formatDate = (dateString, toArray) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1);
    const day = date.getDate();
    
    if (!toArray) {
      return [year, month, day];
    } else {

      const formattedMonth = month.toString().padStart(2, '0');
      const formattedDay = day.toString().padStart(2, '0'); 
      return `${formattedDay}/${formattedMonth}/${year}`;
    }
  };
  

  return { academicPeriods, academicPeriod , listAcademicPeriodByArea, getAcademicPeriodById, createAcademicPeriod, editAcademicPeriod, deleteAcademicPeriod}
})