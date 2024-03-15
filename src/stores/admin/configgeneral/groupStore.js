import { defineStore } from 'pinia'
import { useCareerStore } from './careerStore';
import AxiosAM from '@/services/AxiosAM';
import { errorMessages } from 'vue/compiler-sfc';

export const useGroup = defineStore('myStore', {
    state: () => ({
        areaSel: null,
        carreraSel: null,
        academicSel: null,
        listGroup: []
    }),

    actions: {

        readListGroup() {
            //admin/areas/1/careers/1/academic-periods/1/groups
            if (this.isValidData()) {
                let direccion = `/admin/areas/${this.areaSel}/careers/${this.carreraSel.id}/academic-periods/${this.academicSel.id}/groups`
                this.isEscribiendo = true
                AxiosAM.get(direccion)
                    .then((respuesta) => {
                        this.listGroup = respuesta.data;
                    })
                    .catch((error) => {
                        console.log(error)
                        this.listGroup = [];
                    })
            }else{
                this.listGroup = [];
            }
        },

        setDefaultInicial() {
            this.carreraSel = null
            this.academicSel = null
        },

        setAreaSel(area) {
            this.areaSel = area;
        },

        setCarrera(carrera) {
            this.carreraSel = carrera;
            this.readListGroup();
        },

        setPeriodo(periodo) {
            this.academicSel = periodo;
            this.readListGroup();
        },

        isValidData() {
            let valido = false;
            if (this.academicSel !== null && this.carreraSel !== null && this.areaSel !== null && this.areaSel !== undefined) {
                valido = true;
            }
            return valido
        },
    }
})