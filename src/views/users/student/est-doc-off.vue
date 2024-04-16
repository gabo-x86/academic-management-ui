<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="font-weight-bold">Subir PDFs</span>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-text-field
                    label="PDF 1"
                    type="file"
                    @change="handleFileSelect('pdf1')"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                    label="PDF 2"
                    type="file"
                    @change="handleFileSelect('pdf2')"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="sendPdfsToBackend">Enviar PDFs</v-btn>
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
  margin-bottom: 20px;
}
</style>
