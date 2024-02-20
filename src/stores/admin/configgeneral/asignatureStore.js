import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosAM from '@/services/AxiosAM.js'

const pathAsignatureResource = '/admin/areas';
export const asignatureStore = defineStore('asignatureStore', () => {
  const asignaturas = ref([]);
  const dialog = ref(false);

  async function getAsignatures() {
    try {
      const { status, data } = await AxiosAM.get(pathAsignatureResource);
      if (status === 200) {
        asignaturas.value = data;
        return { success: true, data: data };
      }
    } catch (error) {
      // handle error
      console.log('error getting asignature');
    }
  }

  async function createAsignature(asignatura) {
    try {
      const { status, data } = await AxiosAM.post(pathAsignatureResource, asignatura);
      if (status === 201) {
        asignaturas.value.splice(0, 0, data);
        return { success: true, data: data };
      }
    } catch (error) {
      console.log('error creating area');
      return { error: true, success: false, data: null }
    }
  }

  async function editAsignature(asignatura) {
    try {
      const {status, data} = await AxiosAM.put(`${pathAsignatureResource}/${asignatura.id}`, asignatura);
      if (status === 200) {
        const index = asignaturas.value.findIndex((obj) => obj.id === asignatura.id);
        asignaturas.value.splice(index, 1, asignatura);
        return { success: true, data: data };
      }
    } catch (error) {
      console.log('error editing area');
      return { error: true, success: false, data: null }
    }
  }

  async function deleteAsignature(asignatura) {
    try {
      const {status} = await AxiosAM.delete(`${pathAsignatureResource}/${asignatura.id}`);
      if (status === 204) {
        const index = asignaturas.value.findIndex((obj) => obj.id === asignatura.id);
        asignaturas.value.splice(index, 1);
        return { success: true, data: null };
      }
    } catch (error) {
      console.log('error deleting area');
      return { error: true, success: false, data: null }
    }
  }

  return { asignaturas, dialog, getAsignatures, createAsignature, editAsignature, deleteAsignature }
})
