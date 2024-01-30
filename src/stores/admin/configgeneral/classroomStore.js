import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import AxiosAM from '@/services/AxiosAM.js'
import { useMainStore } from '@/stores/globalArea.js';

const pathCareerResource = '/admin/areas';

export const useClassroomStore = defineStore('classroomStore', ()=>{
    const classrooms=ref([]);
    const currentClassroom = ref(null);
    const mainStore = useMainStore();
    async function getClassrooms(areaId){
        try {
            const {status, data} = await AxiosAM.get(`${pathCareerResource}/${areaId}/classrooms`);
            if (status===200){
                console.log(areaId);
                classrooms.value=data;
            }
        }catch (error){
            console.error('Error getting classroom: ', error);
        }
    }

    async function saveClassroom(model){
        try {
            const { areaId } = mainStore;
            model.classroom.areaId = areaId;
            const {status, data} = await AxiosAM.post(`${pathCareerResource}/2/classrooms`, model.classroom);
            if (status===200){
                console.log('Classroom was saved successfully');
                model.classroom={
                    areaId:'',
                    name:'',
                    initials:'',
                    type:'',
                    address:'',
                };
            }
        }catch (error){
            console.error('Error saving classroom: ', error);
        }
    }

    async function getClassroomById(classroomId){
        try {
            const { status, data } = await AxiosAM.get(`${pathCareerResource}/2/classrooms/${classroomId}`);
            if (status === 200) {
                const classroomData=data ;
                if(classroomData){
                    currentClassroom.value=classroomData
                }else{
                    console.error('Invalid data received:', data);
                }
                console.log(classroomId);
            }
        } catch (error) {
            console.error('Error getting career by id:', error);
        }
    }
    async function saveClassroomEdit(classroomId) {

        try {
            const { status, data } = await AxiosAM.put(`${pathCareerResource}/2/classrooms/${classroomId}`, currentClassroom.value);
            if (status === 200) {
                console.log('Classroom edit was saved successfully');
            }
        } catch (error) {
            console.error('Error saving classroom:', error);
        }
    }

    async function deleteClassroomById(classroomId){
        try {
            const {status, data}=await AxiosAM.delete(`${pathCareerResource}/2/classrooms/${classroomId}`)
            if (status === 200) {
                console.log('Classroom was deleted successfully');
            }
        }catch (error){
            console.error('Error deleting classroom:', error)
        }
    }

    return { classrooms, getClassrooms, saveClassroom, getClassroomById, saveClassroomEdit,deleteClassroomById, currentClassroom };
});