<template>
  <vue3-html2pdf
    :html-to-pdf-options="options"
    :show-layout="false"
    :float-layout="true"
    :enable-download="false"
    :preview-modal="true"
    :pdf-quality="3"
    :manual-pagination="false"
    filename="Malla_Curricular.pdf"
    pdf-format="legal"
    pdf-orientation="landscape"
    @hasGenerated="hasGenerated($event)"
    ref="html2Pdf"
  >
    <template #pdf-content>
      <h3>Malla Curricular</h3>
      <v-row no-gutters>
        <v-col
          class="text-center"
          style="min-width: 102px"
          cols="auto"
          v-for="(item, index) in items"
          :key="index"
        >
          <v-card color="primary" variant="tonal" class="header">{{ item.title }}</v-card>
          <!--Card of subject--->
          <v-col class="col-cards">
            <v-card
              color="primary"
              variant="tonal"
              class="v-cards"
              v-for="(materia, index) in item.materias"
              :key="index"
            >
              <v-toolbar color="primary" height="25"
                ><v-spacer></v-spacer>{{ materia.id }}<v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text> {{ materia.nombre }} </v-card-text>
              <div class="prerequisites" v-if="materia.prerequisitos.length != 0">
                <v-divider class="border-opacity-100" color="info"></v-divider>
                <v-chip
                  density="comfortable"
                  size="small"
                  color="primary"
                  variant="flat"
                  v-for="(prerequisito, index) in materia.prerequisitos"
                  :key="index"
                >
                  {{ prerequisito }}
                </v-chip>
              </div>
            </v-card>
          </v-col>
        </v-col>

        <v-col class="text-center" style="min-width: 102px; max-width: 102px">
          <v-card color="primary" variant="tonal" class="header">Nivel D</v-card>
        </v-col>
        <v-col class="text-center" style="min-width: 102px; max-width: 102px">
          <v-card color="primary" variant="tonal" class="header">Nivel E</v-card>
        </v-col>
        <v-col class="text-center" style="min-width: 102px; max-width: 102px">
          <v-card color="primary" variant="tonal" class="header">Nivel F</v-card>
        </v-col>
        <v-col class="text-center" style="min-width: 102px; max-width: 102px">
          <v-card color="primary" variant="tonal" class="header">Nivel G</v-card>
        </v-col>
        <v-col class="text-center" style="min-width: 102px; max-width: 102px">
          <v-card color="primary" variant="tonal" class="header">Nivel H</v-card>
        </v-col>
        <v-col class="text-center" style="min-width: 102px; max-width: 102px">
          <v-card color="primary" variant="tonal" class="header">Nivel I</v-card>
        </v-col>
        <v-col class="text-center" style="min-width: 102px; max-width: 102px">
          <v-card color="primary" variant="tonal" class="header">Nivel J</v-card>
        </v-col>
      </v-row>
    </template>
  </vue3-html2pdf>

  <div ref="imagenMalla" class="imgMalla">
    <h3 class="title-img-malla">Malla Curricular</h3>

    <v-row class="text-center row-principal" v-for="(item, index) in items" :key="index">
      <v-card color="primary" variant="tonal" class="header-row">{{ item.title }}</v-card>

      <!--Card of subject--->
      <div class="row-cards">
        <v-card
          color="primary"
          variant="tonal"
          class="v-cards"
          v-for="(materia, index) in item.materias"
          :key="index"
        >
          <v-toolbar color="primary" height="25"
            ><v-spacer></v-spacer>{{ materia.id }}<v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text> {{ materia.nombre }} </v-card-text>
          <div class="prerequisites" v-if="materia.prerequisitos.length != 0">
            <v-divider class="border-opacity-100" color="info"></v-divider>
            <v-chip
              density="comfortable"
              size="small"
              color="primary"
              variant="flat"
              v-for="(prerequisito, index) in materia.prerequisitos"
              :key="index"
            >
              {{ prerequisito }}
            </v-chip>
          </div>
        </v-card>
      </div>
    </v-row>
  </div>

  <button @click="generateReport()">Simular pdf</button>
  <button type="button" class="button" @click="previewURL">Simular img</button>
</template>

<script setup>
import Vue3Html2pdf from 'vue3-html2pdf'
import { onMounted, ref } from 'vue'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import 'viewerjs/dist/viewer.css'
import { api as viewerApi } from 'v-viewer'

const html2Pdf = ref(null)
const imagenMalla = ref(null)
var malla = null
var url = ''
onMounted(async () => {
  malla = await html2canvas(imagenMalla.value).then((canvas) => {
    url = canvas.toDataURL()
  })
})

const previewURL = () => {
  console.log(url)
  const sourceImageURLs = [url]
  const $viewer = viewerApi({
    images: sourceImageURLs
  })
}

const options = {
  margin: [10, 10, 10, 10],
  filename: 'Malla_Curricular.pdf',

  pagebreak: {
    mode: ['avoid-all', 'css'],
    avoid: 'v-col'
  },
  html2canvas: { scale: 2 },
  jsPDF: {
    orientation: 'l',
    compress: true
  }
}

const generateReport = () => {
  console.log(html2Pdf)
  html2Pdf._value.generatePdf()
}

const items = [
  {
    title: 'Nivel A',
    materias: [
      {
        id: 1,
        nombre: 'Introducción a la programación',
        prerequisitos: []
      },
      {
        id: 2,
        nombre: 'Cálculo I',
        prerequisitos: []
      },
      {
        id: 3,
        nombre: 'Algebra I',
        prerequisitos: []
      },
      {
        id: 4,
        nombre: 'Métodologia investigación y tec. comunicación',
        prerequisitos: []
      },
      {
        id: 5,
        nombre: 'Ingles I',
        prerequisitos: []
      },
      {
        id: 6,
        nombre: 'Física General',
        prerequisitos: []
      }
    ]
  },
  {
    title: 'Nivel B',
    materias: [
      {
        id: 7,
        nombre: 'Elem. de programación y estruc. de datos',
        prerequisitos: [1]
      },
      {
        id: 8,
        nombre: 'Cálculo II',
        prerequisitos: [2]
      },
      {
        id: 9,
        nombre: 'Algebra II',
        prerequisitos: [3, 2]
      },
      {
        id: 10,
        nombre: 'Arquitectura de computadoras',
        prerequisitos: [3]
      },
      {
        id: 11,
        nombre: 'Matemática discreta',
        prerequisitos: [5]
      }
    ]
  },
  {
    title: 'Nivel C',
    materias: [
      {
        id: 12,
        nombre: 'Ecuaciones diferenciales',
        prerequisitos: [1]
      },
      {
        id: 13,
        nombre: 'Estadística I',
        prerequisitos: [7]
      },
      {
        id: 14,
        nombre: 'Cálculo numérico',
        prerequisitos: [6]
      },
      {
        id: 15,
        nombre: 'Métodos técnicas y taller de programación',
        prerequisitos: []
      },
      {
        id: 16,
        nombre: 'Base de datos I',
        prerequisitos: [9]
      },
      {
        id: 17,
        nombre: 'Circuitos electrónicos',
        prerequisitos: [11]
      },
      {
        id: 17,
        nombre: 'Circuitos electrónicos',
        prerequisitos: [11]
      },
      {
        id: 17,
        nombre: 'Circuitos electrónicos',
        prerequisitos: [11]
      },
      {
        id: 17,
        nombre: 'Circuitos electrónicos',
        prerequisitos: [11]
      },
      {
        id: 17,
        nombre: 'Circuitos electrónicos',
        prerequisitos: [11]
      },
      {
        id: 17,
        nombre: 'Circuitos electrónicos',
        prerequisitos: [11]
      }
    ]
  },
  {
    title: 'Nivel C',
    materias: [
      {
        id: 7,
        nombre: 'Elem. de programación y estruc. de datos',
        prerequisitos: [1]
      },
      {
        id: 8,
        nombre: 'Cálculo II',
        prerequisitos: [2]
      },
      {
        id: 9,
        nombre: 'Algebra II',
        prerequisitos: [3, 2]
      },
      {
        id: 10,
        nombre: 'Arquitectura de computadoras',
        prerequisitos: [3]
      },
      {
        id: 11,
        nombre: 'Matemática discreta',
        prerequisitos: [5]
      }
    ]
  },
  {
    title: 'Nivel D',
    materias: [
      {
        id: 7,
        nombre: 'Elem. de programación y estruc. de datos',
        prerequisitos: [1]
      },
      {
        id: 8,
        nombre: 'Cálculo II',
        prerequisitos: [2]
      },
      {
        id: 9,
        nombre: 'Algebra II',
        prerequisitos: [3, 2]
      },
      {
        id: 10,
        nombre: 'Arquitectura de computadoras',
        prerequisitos: [3]
      },
      {
        id: 11,
        nombre: 'Matemática discreta',
        prerequisitos: [5]
      }
    ]
  }
]
</script>
 
<style>
h3 {
  margin: 8px;
}
.v-divider {
  height: 15px;
  margin: 0px;
  padding: 0%;
}
.header {
  margin: 8px 0%;
  padding: 8px 0px;
}

.header-row {
  display: flex;
  min-height: 112px;
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 3px;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 50px;
}
.v-row {
  width: 80vw;
}
.vue-html2pdf {
  margin: 2vw;
}

.v-col {
  margin: 5px;
  max-height: 700px;
}

.v-card-text {
  font-size: 12px;
  padding: 1px 2px;
}

.v-cards {
  height: 112px;
  width: 107px;
  margin-bottom: 10px;
  margin-right: 5px;
  position: relative;
}

.prerequisites {
  position: absolute;
  bottom: 0px;
  width: 100%;
}

.col-cards {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
}

.row-cards {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 0px;
  padding: 0px;
  width: 90%;
}

.row-principal {
  display: flex;
}

.title-row {
  width: 5%;
}

.v-chip__content {
  margin: 0px;
  padding: 0px;
}
.v-chip {
  padding: 0px;
}
.imgMalla {
  width: auto;
  padding: 5%;
  position: fixed;
  left: -100vw;
  top: 0;
  overflow: auto;
}
.title-img-malla {
  margin-bottom: 25px;
}
</style>
