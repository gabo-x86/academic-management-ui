import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosAM from '@/services/AxiosAM.js'

const pathSubjectResource = '/admin/areas';
export const useSubjectStore = defineStore('subjectStore', () => {
    const subjects = ref([]);
    const subject = ref({});

    async function getSubjects(areaId) {
        try {
            const { status, data } = await AxiosAM.get(`${pathSubjectResource}/${areaId}/subjects`);
            if (status === 200) {
                subjects.value = data;
                return { success: true, data: data };
            }
        } catch (error) {
            console.log('error getting subjects');
        }
    }

    async function getSubjectWithId(areaId, idSubject) {
        try {
            const { status, data } = await AxiosAM.get(`${pathSubjectResource}/${areaId}/subjects/${idSubject}`);
            if (status === 200) {
                subject.value = data;
                return { success: true, data: data };
            }
        } catch (error) {
            console.log('error getting subjects');
        }
    }

    return { subjects, subject, getSubjects, getSubjectWithId }
})