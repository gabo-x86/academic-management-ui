import { ref,  } from 'vue'
import { defineStore } from 'pinia'
import AxiosAM from '@/services/AxiosAM.js'
import { useMainStore } from '@/stores/MainStore'

const pathCareerResource = '/admin/areas';
const pathCurriculumResource = '/admin/areas/{areaId}/careers/';
const pathArea = '/admin/areas/';

export const useCurriculumStore = defineStore('classroomStore', () => {
    const curriculums = ref([]);
    const curriculumsByCareer = ref([]);
    const currentCurriculum = ref(null);
    const mainStore = useMainStore();

    const carrera = ref({});

    async function getCurriculumsByCareer(areaId,careerId) {
        try {
            const { status, data } = await AxiosAM.get(`${pathCareerResource}/${areaId}/careers/${careerId}/curriculums`);
            if (status === 200) {
                curriculumsByCareer.value = data;
            }
        } catch (error) {
            console.error('Error getting curriculums: ', error);
        }
    }

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

    async function getCareerWithId(idCareer) {
      try {
        const { status, data } = await AxiosAM.get(`${pathArea}{areaID}/careers/${idCareer}`);
  
        if (status === 200) {
          carrera.value = data;
          return { success: true, data: data };
        }
      } catch (error) {
        console.log('error getting career..');
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

    return {curriculums,curriculumsByCareer,currentCurriculum, carrera,getCurriculumsByCareer, getCurriculums, getCareerWithId, createCurriculum};
}
);
