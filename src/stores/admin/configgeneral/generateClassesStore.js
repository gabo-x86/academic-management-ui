import { defineStore } from 'pinia'
import { useCareerStore } from './careerStore';
import AxiosAM from '@/services/AxiosAM';
import { errorMessages } from 'vue/compiler-sfc';

export const useGenerateClasses = defineStore('myStore', {
  state: () => ({
    carreraSel: null,
    itineraroSel: null,
    academicSel: null,
  }),

  actions: {
    setDefaultInicial() {
      this.carreraSel = null
      this.itineraroSel = null
      this.academicSel = null
    },

    setCarrera(carrera) {
      this.carreraSel = carrera;
    },

    setItinerario(itinerario) {
      this.itineraroSel = itinerario;
    },

    setPeriodo(periodo) {
      this.academicSel = periodo;
    },

    isValidData() {
      let valido = false;
      if (this.academicSel !== null && this.carreraSel !== null && this.itineraroSel !== null) {
        valido = true;
      }
      return valido
    },

    /*async generateClassesByItinerary(areaId) {
      let mensaje = "";
      let isError = true;
      //http://localhost:8080/admin/areas/1/careers/1/academic-periods/1/groups/bulk-create-groups?itineraryId=1
      if (areaId !== null && areaId !== undefined) {
        let direccion = `/admin/areas/${areaId}/careers/${this.carreraSel.id}/academic-periods/${this.academicSel.id}/groups/bulk-create-groups?itineraryId=${this.itineraroSel.id}`;
        if (this.academicSel !== null && this.carreraSel !== null && this.itineraroSel !== null) {
          console.log("TODOOKKKSAVE:::", mensaje, isError, direccion)
          try {
            console.log("GUARDAAAAAAAAAAAAAAAAAAR ESCRIBE INI")

            const { status, data } = await AxiosAM.post(`/admin/areas/${areaId}/careers/${this.carreraSel.id}/academic-periods/${this.academicSel.id}/groups/bulk-create-groups?itineraryId=${this.itineraroSel.id}`, null);

            console.log("GUARDAAAAAAAAAAAAAAAAAAR ESCRIBE", mensaje, isError)

            if (status === 200) {
              isError = false;
              mensaje = "Cambios guardatos correctamente"
              console.log("SE GUARDO BIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEN")
            }
          } catch (error) {
            console.error('Error saving career:', error);
            isError = true;
            mensaje = "Ocurrió un error en el servidor."
          }
        } else {
          isError = true;
          mensaje = "Debe rellenar todos los campos solicitados"
        }
      } else {
        isError = true;
        mensaje = "Selecciona un area"
      }

      console.log("GUARDAAAAAAAAAAAAAAAAAAR", mensaje, isError)

      return { mensaje: mensaje, isError: isError }
    }*/
  }
})