import { defineStore } from 'pinia'
import { useCareerStore } from './careerStore';
import AxiosAM from '@/services/AxiosAM';
import { errorMessages } from 'vue/compiler-sfc';

export const useGroup = defineStore('myStore', {
    state: () => ({
        areaSel: null,
        carreraSel: null,
        academicSel: null,
        listGroup: [],
        listCurriculum: [],
        listMaterias: [],
        listProfessor: [],
        listAulas:[],
        datoEdit: {
            curriculumId: null,
            subjectId: null,
            identifier: null,
            remark: null,
            listSchedule: []
        }
    }),

    actions: {
        setCurriculumEd(curriculum) {
            this.datoEdit.curriculumId = curriculum.id;
        },

        setSubjectEd(subject) {
            this.datoEdit.subjectId = subject.id;
            this.datoEdit.remark = subject.name;
        },

        addNewListSchedule(dato) {
            let datos = {
                dayOfWeek: "FRIDAY",
                startTime: "09:00",
                endTime: "11:00",
                professorId: null, //professorId: null,
                assistant: "María González",
                classroomId: null, //classroomId: 2,
                groupItineraryId: 1
            }

            this.datoEdit.listSchedule.push(dato);

        },

        readListCurriculums() {
            //admin/areas/1/careers/1/curriculums
            if (this.isValidData()) {
                let direccion = `/admin/areas/${this.areaSel}/careers/${this.carreraSel.id}/curriculums`

                AxiosAM.get(direccion)
                    .then((respuesta) => {
                        this.listCurriculum = respuesta.data;
                        console.log("LEIIII CURRICULUM", this.listCurriculum)
                    })
                    .catch((error) => {
                        console.log(error)
                        this.listCurriculum = [];
                    })
            } else {
                this.listCurriculum = [];
            }
        },

        readAulas() {
            if (this.isValidData()) {
                let direccion = "/admin/areas/"+this.areaSel+"/classrooms"

                AxiosAM.get(direccion)
                    .then((respuesta) => {
                        this.listAulas = respuesta.data;
                    })
                    .catch((error) => {
                        console.log(error)
                        this.listAulas = []
                    })
            } else {
                this.listAulas = []
            }
        },

        readProfessors() {
            if (this.isValidData()) {
                let direccion = "/professors"

                AxiosAM.get(direccion)
                    .then((respuesta) => {
                        let listaRead = respuesta.data;
                        let nuevaLista = []
                        for (let i = 0; i < listaRead.length; i++) {
                            nuevaLista.push({ id: listaRead[i].id, name: listaRead[i].name + " " + listaRead[i].lastName + " " + listaRead[i].secondLastName })
                        }

                        this.listProfessor = nuevaLista;
                    })
                    .catch((error) => {
                        console.log(error)
                        this.listProfessor = []
                    })
            } else {
                this.listProfessor = []
            }
        },

        readMaterias() {
            if (this.isValidData()) {
                let direccion = `/admin/areas/${this.areaSel}/subjects`

                AxiosAM.get(direccion)
                    .then((respuesta) => {
                        this.listMaterias = respuesta.data;
                    })
                    .catch((error) => {
                        console.log(error)
                        this.listMaterias = []
                    })
            } else {
                this.listMaterias = []
            }
        },

        readListGroup() {
            //admin/areas/1/careers/1/academic-periods/1/groups
            if (this.isValidData()) {
                let direccion = `/admin/areas/${this.areaSel}/careers/${this.carreraSel.id}/academic-periods/${this.academicSel.id}/groups`

                AxiosAM.get(direccion)
                    .then((respuesta) => {
                        this.listGroup = respuesta.data;
                    })
                    .catch((error) => {
                        console.log(error)
                        this.listGroup = [];
                    })
            } else {
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
            this.readListCurriculums();
            this.readMaterias();
            this.readProfessors();
            this.readAulas();
        },

        setPeriodo(periodo) {
            this.academicSel = periodo;
            this.readListGroup();
            this.readListCurriculums();
            this.readMaterias();
            this.readProfessors();
            this.readAulas();
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