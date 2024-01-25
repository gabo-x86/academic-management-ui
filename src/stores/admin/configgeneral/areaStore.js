import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import AxiosAM from '@/services/AxiosAM.js'

const pathAreaResource = '/admin/areas';
export const useAreaStore = defineStore('areaStore', () => {
  const areas = ref([]);

  async function getAreas() {
    try {
      const { status, data } = await AxiosAM.get(pathAreaResource);
      //AxiosAM.post(pathCityResource, area);
      //AxiosAM.put(pathCityResource, area);
      //AxiosAM.delete(`${pathCityResource}/${id}`);
      if (status === 200) {
        areas.value = data;
      }
    } catch (error) {
      // handle error
      console.log('error getting areas');
    }
  }

  return { areas, getAreas }
})
