import { defineStore } from 'pinia';
import AxiosAM from '@/services/AxiosAM.js';

export const userDataPdfStore = defineStore('userDataStore', () => {

    let codigoEst = "202401"
    let fechaNac = "01-01-2000"
    async function uploadPdfsToBackend({ pdf1, pdf2 }) {
        const formData = new FormData();

        const renamedPdf1 = new File([pdf1], 'ci_' + pdf1.name, { type: pdf1.type });
        const renamedPdf2 = new File([pdf2], 'ci_' + pdf2.name, { type: pdf2.type });

        formData.append('Carnet', renamedPdf1);
        formData.append('DiplomaLibreta', renamedPdf2);

        try {
            //const response = await AxiosAM.post('/files/uploadPdf/{codeStudent}/{fechaNacimiento}', formData);
            const response = await AxiosAM.post(`/files/uploadPdf/${codigoEst}/${fechaNac}`, formData);
            //const response = await AxiosAM.post('/files/uploadPdf/20241345/01-01-2000', formData);
            console.log('PDFs uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading PDFs:', error);
        }
    }

    return { uploadPdfsToBackend };
});