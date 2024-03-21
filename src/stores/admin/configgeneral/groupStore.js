import { defineStore } from 'pinia'
import { useCareerStore } from './careerStore';
import AxiosAM from '@/services/AxiosAM';
import { errorMessages } from 'vue/compiler-sfc';
import UDate from '@/services/UDate';

export const useGroup = defineStore('myStore', {
    state: () => ({
        areaSel: null,
        carreraSel: null,
        academicSel: null,
        listGroup: [],
        listCurriculum: [],
        listMaterias: [],
        listProfessor: [],
        listAulas: [],
        datoEdit: {
            curriculumId: null,
            subjectId: null,
            identifier: null,
            remark: null,
            listSchedule: []
        },
        defaultEdit:{
            curriculumId: null,
            subjectId: null,
            identifier: null,
            remark: null,
            listSchedule: []
        }
    }),

    actions: {
        isValidGroupEdit() {
            let valido = true;
            if (this.datoEdit.curriculumId === null || this.datoEdit.subjectId === null || this.datoEdit.identifier === null || this.datoEdit.listSchedule.length === 0) {
                valido = false;
            }
            return valido
        },

        setCurriculumEd(curriculum) {
            this.datoEdit.curriculumId = curriculum.id;
        },

        setSubjectEd(subject) {
            this.datoEdit.subjectId = subject.id;
            this.datoEdit.remark = subject.name;
        },

        addGroupBD() {
            //for(let i=0; i<this.datoEdit.listSchedule.length; i++){
              //  this.datoEdit.listSchedule[i].groupItineraryId = 1;//this.datoEdit.identifier;
            //}

            //http://localhost:8080/admin/areas/1/careers/1/academic-periods/1/groups

            console.log("TOy escribiendo BDGROUP ADD")

            let direccion = `/admin/areas/${this.areaSel}/careers/${this.carreraSel.id}/academic-periods/${this.academicSel.id}/groups`
            AxiosAM.post(direccion, this.datoEdit)
                .then((respuesta) => {
                    //this.listCurriculum = respuesta.data;
                    //console.log("LEIIII CURRICULUM", this.listCurriculum)
                    this.readListGroup();
                    this.datoEdit = this.defaultEdit;
                })
                .catch((error) => {
                    console.log(error)
                    //this.listCurriculum = [];
                })
        },

        setListSchedule(datos) {
            /*let datos = {
                dayOfWeek: "FRIDAY",
                startTime: "09:00",
                endTime: "11:00",
                professorId: null, //professorId: null,
                assistant: "María González",
                classroomId: null, //classroomId: 2,
                groupItineraryId: 1
            }*/

            let nuevaLista = [];

            for (let i = 0; i < datos.length; i++) {

                let nuevo = {
                    dayOfWeek: UDate.getDayEn(datos[i].dayOfWeek),
                    startTime: datos[i].startTime,
                    endTime: datos[i].endTime,
                    professorId: datos[i].professor!==null?datos[i].professor.id:null, //professorId: null,
                    assistant: datos[i].assistant,
                    classroomId: datos[i].classroom.id, //classroomId: 2,
                    groupItineraryId: 1//this.datoEdit.identifier
                }

                nuevaLista.push(nuevo);

            }

            //this.datoEdit.listSchedule.push(dato);
            this.datoEdit.listSchedule = nuevaLista;

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
                let direccion = "/admin/areas/" + this.areaSel + "/classrooms"

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