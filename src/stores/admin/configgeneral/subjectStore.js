import { ref } from 'vue'
import { defineStore } from 'pinia'
import AxiosAM from '@/services/AxiosAM.js'

const pathSubjectResource = '/admin/areas';
export const useSubjectStore = defineStore('subjectStore', () => {
    const subjects = ref([]);

    async function getSubjects(areaId) {
        try {
            // http://localhost:8080/admin/areas/1/subjects
            // await AxiosAM.get(`${pathCareerResource}/${areaId}/careers/${careerId}/curriculums`);
            const { status, data } = await AxiosAM.get(`${pathSubjectResource}/${areaId}/subjects`);
            if (status === 200) {
                subjects.value = data;
                return { success: true, data: data };
            }
        } catch (error) {
            // handle error
            console.log('error getting subjects');
        }
    }

    return { subjects, getSubjects }
})