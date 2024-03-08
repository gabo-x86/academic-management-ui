<script setup>
import { onMounted, ref, watch, inject, getCurrentInstance } from 'vue'
import LevelCurriculum from '@/components/admin/configgeneral/meshcurriculum/LevelCurriculum.vue'
import { useCurriculumStore } from '@/stores/admin/configgeneral/curriculumStore';
import { useMainStore } from '@/stores/MainStore';
import { useRoute } from 'vue-router';

const route = useRoute();

const curriculumStore = useCurriculumStore();
const carreraActive = ref({});
const carreraId = ref('');
const curriculumId = ref('');
const lstNiveles = [
    {levelIdentifier: 1, levelName: 'Nivel A' },
    {levelIdentifier: 2, levelName: 'Nivel B' },
    {levelIdentifier: 3, levelName: 'Nivel C' },
    {levelIdentifier: 4, levelName: 'Nivel D' },
    {levelIdentifier: 5, levelName: 'Nivel E' },
    {levelIdentifier: 6, levelName: 'Nivel F' },
    {levelIdentifier: 7, levelName: 'Nivel G' },
    {levelIdentifier: 8, levelName: 'Nivel H' },
    {levelIdentifier: 9, levelName: 'Nivel I' },
    {levelIdentifier: 10, levelName: 'Nivel J' },
    {levelIdentifier: 11, levelName: 'Nivel K' },
    {levelIdentifier: 12, levelName: 'Nivel L' },
    {levelIdentifier: 13, levelName: 'Nivel M' },
    {levelIdentifier: 14, levelName: 'Nivel N' },
    {levelIdentifier: 15, levelName: 'Nivel 0' },
    {levelIdentifier: 16, levelName: 'Nivel P' },
    {levelIdentifier: 17, levelName: 'Nivel Q' },
    ];
const tempLstNivel = ['Nivel A'];
const niveles = ref([]);
const mainStore = useMainStore();
const areaId = 1; // por ahora  mainStore.area.areaId
console.log('areaId=', areaId);
const curriculumForm = ref({
    id: null,
    careerId: route.params.idCarrera,
    areaId: areaId,
    name: '',
    minApprovedSubjects: '',
    startDate: '',
    endDate: '',
    levelList: []
});

const nivelInicioCompartido = ref({
    levelIdentifier: 1,
    levelName: "Nivel A",
});

const asignaturaInicioCampartido = ref([]);

function onSave() {
    const curriculumTemp = Object.assign({}, curriculumForm.value);
    console.log('Form=', curriculumTemp);
}
function addNewAsignature() {
    console.log('niveles completos=', lstNiveles);
    console.log('temporal lista=', tempLstNivel);
    console.log('me hiciste click');

    

    const filtro = lstNiveles.filter(item => item.levelName != tempLstNivel );

    // let approved = students.filter(student => student.score >= 11);

    console.log('filtro=',filtro);
    // primer valor del array
    console.log('primero en lista=', filtro[0]);
    tempLstNivel.push(filtro[0].levelName);
    console.log('auxliar=', tempLstNivel);

}
onMounted(async () => {
    const route = useRoute();
    const careerId = route.params.idCarrera;
    carreraId.value = careerId;
    const carrera = await curriculumStore.getCareerWithId(careerId);
    carreraActive.value = carrera.data;
    curriculumId.value = route.params.id;
    console.log('id=', curriculumId);
    console.log('carreraActive=', carreraActive.value);

    console.log(' mainStore.area.areaId=',  mainStore.area.areaId );

    const globalVar = inject('globalAreaSelected');
    console.log('-1-->', globalVar);

    console.log('mensaje=', inject('message'));
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
            <v-btn class="mr-2" color="primary" @click="onSave">
                Guardar
            </v-btn>
        </v-row>

        <v-row align="center" justify="center">
            <v-col class="fill-height" height="500">
                <div class="text-center grey d-flex flex-column align-center justify-center" height="100%">
                    <h3>Nueva mallas curriculares</h3>
                    <!-- <p>{{globalAreaSelected}}</p> -->
                </div>
            </v-col>
        </v-row>

        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-text-field v-show="false" v-model="curriculumForm.id" />
                    <v-text-field v-show="false" v-model="curriculumForm.careerId" />
                    <v-text-field v-show="false" v-model="curriculumForm.areaId" />
                    <v-col cols="12" md="6">
                        <v-text-field v-model="curriculumForm.name" :counter="50" label="Nombre" required
                            hide-details></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-text-field v-model="curriculumForm.minApprovedSubjects" :counter="10"
                            label="Número Minimo de Asignaturas Aprobadas" hide-details required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-text-field type="date" label="Fecha inicio" v-model="curriculumForm.startDate"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field type="date" label="Fecha fin" v-model="curriculumForm.endDate"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>

            <v-row class="justify-end">
                <v-btn class="mr-2" color="primary" @click="addNewAsignature">
                    <v-icon>mdi-plus</v-icon> Agregar nivel
                </v-btn>
            </v-row>
        </v-form>
        <v-row>
            <v-col sm="12" md="6" class="mt-4">
                <level-curriculum :nivel-obj="nivelInicioCompartido" :asignatura-array="asignaturaInicioCampartido"></level-curriculum>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped></style>