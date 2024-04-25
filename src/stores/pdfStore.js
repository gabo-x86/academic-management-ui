import { defineStore } from 'pinia';

import AxiosAM from '@/services/AxiosAM';

const PDF_ENDPOINT = '/files/uploadPdf'; // Ruta del endpoint en el backend

export const usePdfStore = defineStore({
    id: 'pdf',
    state: () => ({
        pdf1: null,
        pdf2: null,
        codeStudent: 978,
        fechaNacimiento: '03-02-2000',
    }),
    actions: {
        async uploadPdfsToBackend() {
            const { pdf1, pdf2, codeStudent, fechaNacimiento } = this;

            const formData = new FormData();
            formData.append('files', pdf1);
            formData.append('files', pdf2);

            try {
                const response = await AxiosAM.post(`${PDF_ENDPOINT}/${codeStudent}/${fechaNacimiento}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Response from backend:', response.data);
            } catch (error) {
                console.error('Error sending PDFs to backend:', error);
                throw error;
            }
        },
        setPdf1(file) {
            this.pdf1 = file;
        },
        setPdf2(file) {
            this.pdf2 = file;
        },
    },
});
