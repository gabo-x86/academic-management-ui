<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title align="center">
              DOCUMENTOS OFICIALES (FORMATO PDF)
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                    label="Carnet de Identidad"
                    type="file"
                    accept=".pdf"
                @change="handleFileSelect('pdf1')"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                    label="Diploma o Libreta"
                    type="file"
                    accept=".pdf"
                @change="handleFileSelect('pdf2')"
                ></v-text-field>
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
  const formData = new FormData();
  formData.append('pdf1', selectedPdf1.value);
  formData.append('pdf2', selectedPdf2.value);

  try {
    const response = await fetch('/api/upload-pdfs', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log('PDFs uploaded successfully:', data);
  } catch (error) {
    console.error('Error uploading PDFs:', error);
  }
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
.v-card-title{
  align-content: center;
  margin: auto;
}
</style>
