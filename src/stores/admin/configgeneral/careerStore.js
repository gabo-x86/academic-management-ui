  import { defineStore } from 'pinia';
  import { ref } from 'vue'
  import AxiosAM from '@/services/AxiosAM';
  import { useMainStore } from '@/stores/global';
  import { format, parse } from 'date-fns';

  const pathCareerResource = '/admin/areas'; 

  export const useCareerStore = defineStore('careerStore', () => {
    const careers = ref([]);
    const currentCareer = ref(null);
    const mainStore = useMainStore();
    async function getCareers(areaId) {
      try {
        const { status, data } = await AxiosAM.get(`${pathCareerResource}/${areaId}/careers`);
        if (status === 200) {
          careers.value = data;
        }
      } catch (error) {
        console.error('Error getting careers:', error);
      }
    }

    async function saveCareer(model) {
      try {
        const { areaId } = mainStore;
        model.career.areaId = areaId;
        console.log(model.career.areaId)
        
        const parsedCreationDate = parse(model.career.creationDate, 'dd/MM/yyyy', new Date());
        model.career.creationDate = format(parsedCreationDate, 'yyyy-MM-dd', { timezone: 'UTC' });
    
        const { status, data } = await AxiosAM.post(`${pathCareerResource}/2/careers`, model.career);
    
        if (status === 200) {
          model.career = {
            areaId: '',
            name: '',
            initials: '',
            description: '',
          };
        }
      } catch (error) {
        console.error('Error saving career:', error);
      }
    }

    const getCareerById = async careerId => {
      try {
        const { status, data } = await AxiosAM.get(`${pathCareerResource}/2/careers/${careerId}`);
        if (status === 200) {
          const careerData = data;
          if (careerData && careerData.creationDate) {
            careerData.formattedCreationDate = format(new Date(careerData.creationDate), 'dd/MM/yyyy', { timezone: 'GMT-4' });
            currentCareer.value = careerData;
          } else {
            console.error('Invalid data received:', data);
          }
        }
      } catch (error) {
        console.error('Error getting career by id:', error);
      }
    };

    async function saveCareerEdit(careerId) {
      try {
        const parsedDate = parse(currentCareer.value.formattedCreationDate, 'dd/MM/yyyy', new Date(), { timezone: 'GMT-4' });
        
        // Asegúrate de que parsedDate sea una fecha válida antes de continuar
        if (!(parsedDate instanceof Date) || isNaN(parsedDate)) {
          console.error('Invalid date:', parsedDate);
          return;
        }
    
        // Formatea la fecha en el formato que espera la base de datos
        const formattedDate = format(parsedDate, 'yyyy-MM-dd', { timezone: 'UTC' });
    
        // Crea el objeto de carrera a guardar
        const careerToSave = {
          ...currentCareer.value,
          creationDate: formattedDate,
        };
    
        // Realiza la solicitud al servidor
        const { status, data } = await AxiosAM.put(`${pathCareerResource}/2/careers/${careerId}`, careerToSave);
    
        if (status === 200) {
          // Éxito al guardar
        }
      } catch (error) {
        console.error('Error saving career:', error);
      }
    }

    return { careers, getCareers, saveCareer, getCareerById, saveCareerEdit, currentCareer };
  });