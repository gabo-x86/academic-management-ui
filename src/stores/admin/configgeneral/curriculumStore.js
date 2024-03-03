import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosAM from '@/services/AxiosAM.js'

const pathCurriculumResource = '/admin/areas/{areaId}/careers/';
const pathArea = '/admin/areas/';
export const useCurriculumStore = defineStore('curriculumStore', () => {
  const curriculums = ref([]);
  const dialog = ref(false);

  async function getCurriculums(career) {
    try {
      const { status, data } = await AxiosAM.get(`${pathCurriculumResource}${career.id}/curriculums`);
      if (status === 200) {
        curriculums.value = data;
        return { success: true, data: data };
      }
    } catch (error) {
      // handle error
      console.log('error getting curriculums..');
    }
  }

  async function createCurriculum(areaId, curriculum) {
    try {
      const { status, data } = await AxiosAM.post(`${pathArea}${areaId}/careers/{careerId}/curriculums`, curriculum);
      if (status === 201) {
        curriculums.value.splice(0, 0, data);
        return { success: true, data: data };
      }
    } catch (error) {
      console.log('error creating area');
      return { error: true, success: false, data: null }
    }
  }

  async function editArea(area) {
    try {
      const {status, data} = await AxiosAM.put(`${pathArea}/${area.id}`, area);
      if (status === 200) {
        const index = curriculums.value.findIndex((obj) => obj.id === area.id);
        curriculums.value.splice(index, 1, area);
        return { success: true, data: data };
      }
    } catch (error) {
      console.log('error editing area');
      return { error: true, success: false, data: null }
    }
  }

  async function deleteArea(area) {
    try {
      const {status} = await AxiosAM.delete(`${pathCurriculumResource}/${area.id}`);
      if (status === 204) {
        const index = curriculums.value.findIndex((obj) => obj.id === area.id);
        curriculums.value.splice(index, 1);
        return { success: true, data: null };
      }
    } catch (error) {
      console.log('error deleting area');
      return { error: true, success: false, data: null }
    }
  }

  return { curriculums, dialog, getCurriculums, createCurriculum, editArea, deleteArea }
})
