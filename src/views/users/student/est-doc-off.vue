<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-center">
              DOCUMENTOS OFICIALES (FORMATO PDF)
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col>
                <v-file-input
                    label="Carnet de Identidad"
                    type="file"
                    prepend-icon="mdi-file-document-outline"
                    accept=".pdf"
                @change="handleFileSelect('pdf1')"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-file-input
                    label="Diploma o Libreta"
                    type="file"
                    prepend-icon="mdi-file-document-outline"
                    accept=".pdf"
                @change="handleFileSelect('pdf2')"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn @click="sendPdfsToBackend">Registrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { userDataPdfStore } from '@/stores/pdfStore.js'; // Ajusta la ruta correcta

const selectedPdf1 = ref(null);
const selectedPdf2 = ref(null);

const handleFileSelect = (inputId) => {
  const fileInput = document.getElementById(inputId);
  const selectedFile = fileInput.files[0];

  if (selectedFile) {
    if (inputId === 'pdf1') {
      selectedPdf1.value = selectedFile;
    } else {
      selectedPdf2.value = selectedFile;
    }
  }
};

const sendPdfsToBackend = async () => {
  await userDataPdfStore.uploadPdfsToBackend({
    pdf1: selectedPdf1.value,
    pdf2: selectedPdf2.value,
  });
};
</script>

<style scoped>
.v-card {
  margin-bottom: 30pt;
  margin-top: 30pt;
  align-content: center;
}
.v-container{
  width: 700pt;
  height: 700pt;
}
.v-card-text {
  margin: auto;
  width: 400pt;
  margin-top: 30pt;
  margin-bottom: 30pt;
  align-content: center;
}
.v-file-input{
  border: 1pt solid #ccc;
  border-radius: 10pt;
  padding: 2pt;
}
.v-card-title{
  align-content: center;
  margin: auto;
}
</style>
