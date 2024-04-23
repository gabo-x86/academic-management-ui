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
                    @change="handleFileSelect($event, 'pdf1')"
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
                    @change="handleFileSelect($event, 'pdf2')"
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
import { usePdfStore } from '@/stores/pdfStore.js'; // Importa tu store de pdf

const handleFileSelect = (event, type) => {
  const pdfStore = usePdfStore(); // Accede al store de pdf

  const file = event.target.files[0];
  if (type === 'pdf1') {
    pdfStore.setPdf1(file);
  } else if (type === 'pdf2') {
    pdfStore.setPdf2(file);
  }
};

const sendPdfsToBackend = async () => {
  const pdfStore = usePdfStore(); // Accede al store de pdf

  await pdfStore.uploadPdfsToBackend();

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
