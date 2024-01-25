import { defineStore } from 'pinia';
import { ref } from 'vue'
import AxiosAM from '@/services/AxiosAM';
import { useMainStore } from '@/stores/global';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';

const pathCareerResource = '/admin/areas'; 

export const useCareerStore = defineStore('careerStore', () => {
  const careers = ref([]);
  const currentCareer = ref(null);
  const mainStore = useMainStore();
  async function getCareers(areaId) {
    try {
      const { status, data } = await AxiosAM.get(`${pathCareerResource}/${areaId}/careers`);
      if (status === 200) {
        console.log(areaId)
        careers.value = data;
      }
    } catch (error) {
      console.error('Error getting careers:', error);
    }
  }

  async function saveCareer(model) {
    try {
      const { areaId } = mainStore;
      model.career.area.id = areaId;
      const { status, data } = await AxiosAM.post(`${pathCareerResource}/2/careers`, model.career);
      if (status === 200) {
        console.log('Career was saved successfully');
        model.career = {
          area: { id: null },
          name: '',
          initials: '',
          description: '',
          code: '',
        };
      }
    } catch (error) {
      console.error('Error saving career:', error);
    }
  }

  async function getCareerById(careerId) {
    try {
      const { status, data } = await AxiosAM.get(`${pathCareerResource}/2/careers/${careerId}`);
      if (status === 200) {
        const careerData = data;
        if (careerData && careerData.creationDate) {
          careerData.creationDate = new Date(careerData.creationDate);
          careerData.creationDate = format(careerData.creationDate, 'dd-MM-yyyy', { timezone: 'GMT-4' });
  
          console.log(careerData.creationDate);
          currentCareer.value = careerData;
  
          console.log(currentCareer.value.creationDate);
        } else {
          console.error('Invalid data received:', data);
        }
      }
    } catch (error) {
      console.error('Error getting career by id:', error);
    }
  }

  async function saveCareerEdit(careerId) {
    
    try {
      const originalDate = parse(currentCareer.value.creationDate, 'dd-MM-yyyy', new Date(),{ timezone: 'UTC' });
      currentCareer.value.creationDate = format(originalDate, 'yyyy-MM-dd', { timezone: 'UTC' });
      const { status, data } = await AxiosAM.put(`${pathCareerResource}/2/careers/${careerId}`, currentCareer.value);
      if (status === 200) {

      }
    } catch (error) {
      console.error('Error saving career:', error);
    }
  }

  return { careers, getCareers, saveCareer, getCareerById, saveCareerEdit, currentCareer };
});