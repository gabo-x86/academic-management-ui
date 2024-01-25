// En tu archivo scheduleStore.js

import { ref } from 'vue';
import { defineStore } from 'pinia';
import AxiosAM from '@/services/AxiosAM.js';

const pathScheduleResource = '/admin/schedule-parameters';

export const useScheduleStore = defineStore('scheduleStore', () => {
  const schedules = ref([]);

  async function getSchedules() {
    try {
      const { status, data } = await AxiosAM.get(pathScheduleResource);
      if (status === 200) {
        schedules.value = data;
      }
    } catch (error) {
      console.error('Error getting schedules', error);
    }
  }

  async function updateSchedule(id, updatedSchedule) {
    try {
      const { status } = await AxiosAM.put(`${pathScheduleResource}/${id}`, updatedSchedule);
      if (status === 200) {
        // Actualización exitosa
        getSchedules(); // Actualiza la lista después de la actualización
      }
    } catch (error) {
      console.error('Error updating schedule', error);
    }
  }

  return { schedules, getSchedules, updateSchedule };
});
