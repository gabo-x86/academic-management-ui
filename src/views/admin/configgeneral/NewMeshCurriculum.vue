<script setup>
import { onMounted, ref, watch, inject, getCurrentInstance} from 'vue'
import LevelCurriculum from '@/components/admin/configgeneral/meshcurriculum/LevelCurriculum.vue'
import {useAreaStore} from '@/stores/admin/configgeneral/areaStore.js';
import { useCurriculumStore } from '@/stores/admin/configgeneral/curriculumStore';
import { useRoute } from 'vue-router';
// const careerId = '';
// const carrera = {};
const curriculumStore = useCurriculumStore();
const carreraActive = ref({});
const carreraId = ref('');
const areaId = 1; // por ahora


onMounted(async () => {
  //await areaStore.getAreas();
  const route = useRoute();
  const careerId = route.params.idCarrera;
  carreraId.value = careerId;
  const carrera = await curriculumStore.getCareerWithId(careerId);
  carreraActive.value = carrera.data;
  console.log('carreraActive=',carreraActive.value);

  const globalVar = inject('globalAreaSelected');
  console.log('-1-->',globalVar);

  // console.log('-2-->', this.globalAreaSelected);
  
});

</script>

<template>
    <div class="pa-4">
        <div class="py-4 mx-lg-auto">
            <p><strong>Carrera: </strong>{{ carreraActive.name }}</p>
        </div>
        
        <v-row class="justify-end">
            <v-btn class="mr-2" color="primary">
                Simular
            </v-btn>
            <v-btn class="mr-2" color="primary">
                Guardar
            </v-btn>
        </v-row>

        <v-row align="center" justify="center">
            <v-col class="fill-height" height="500">
                <div class="text-center grey d-flex flex-column align-center justify-center" height="100%">
                    <h3>Nueva mallas curriculares</h3>
                    <p>{{globalAreaSelected}}</p>
                </div>
            </v-col>
        </v-row>

        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="careerId" :value="carreraId"/>
                        <v-text-field v-model="areaId" :value="areaId"/>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="name" :rules="nameRules" :counter="50" label="Nombre" required
                            hide-details
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                    <v-text-field
                        v-model="minApprovedSubjects" :rules="name" :counter="10" label="Número Minimo de Asignaturas Aprobadas"
                        hide-details required
                    ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-text-field type="date" label="Fecha inicio" v-model="startDate"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field type="date" label="Fecha fin" v-model="endDate"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>

            <v-row class="justify-end">
                <v-btn class="mr-2" color="primary">
                    <v-icon>mdi-plus</v-icon> Agregar nivel
                </v-btn>
            </v-row>
        </v-form>
        
        <v-row>
            <v-col sm="12" md="6" class="mt-4">
                <level-curriculum></level-curriculum>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>

</style>