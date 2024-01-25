import { defineStore } from 'pinia';
import { ref } from 'vue'
import AxiosAM from '@/services/AxiosAM';

const pathCareerResource = '/admin/areas'; 

export const useCareerStore = defineStore('careerStore', () => {
  const careers = ref([]);
  const currentCareer = ref(null);
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
        careerData.creationDate = new Date(careerData.creationDate);
        careerData.creationDate = careerData.creationDate.toISOString();
        careerData.creationDate = careerData.creationDate.split('T')[0];
        currentCareer.value = careerData;
      }
    } catch (error) {
      console.error('Error getting career by id:', error);
    }
  }

  async function saveCareerEdit(careerId) {
    try {
      const { status, data } = await AxiosAM.put(`${pathCareerResource}/2/careers/${careerId}`, currentCareer.value);
      if (status === 200) {
        console.log('Career was saved successfully');
        console.log(career.value);
        console.log(career.value.creationDate);
      }
    } catch (error) {
      console.error('Error saving career:', error);
    }
  }

  return { careers, getCareers, saveCareer, getCareerById, saveCareerEdit, currentCareer };
});