<script setup>
import { onMounted, ref, watch, inject, getCurrentInstance } from 'vue'
import LevelCurriculum from '@/components/admin/configgeneral/meshcurriculum/LevelCurriculum.vue'
import { useCurriculumStore } from '@/stores/admin/configgeneral/curriculumStore';
import { useRoute } from 'vue-router';
const route = useRoute();

const curriculumStore = useCurriculumStore();
const carreraActive = ref({});
const carreraId = ref('');
const curriculumId = ref('');
const areaId = 1; // por ahora
const editedIndex = ref(-1);
const niveles = ref({});
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

const defaultCurriculum = ref({
    id: null,
    levelIdentifier: '',
    levelName: ''
});

const emit = defineEmits(['submit']);

function onSave() {
    const curriculumTemp = Object.assign({}, curriculumForm.value);
    console.log('Form=', curriculumTemp);
    // emit('submit', curriculumTemp);
}

function openNewDialog() {
    niveles.value = defaultCurriculum.value;
    curriculumStore.dialog = true;
}

function dialogFormTitle() {
    return editedIndex.value === -1 ? 'Nuevo Nivel' : 'Editar Nivel';
}



onMounted(async () => {
    //await areaStore.getAreas();
    const route = useRoute();
    const careerId = route.params.idCarrera;
    carreraId.value = careerId;
    const carrera = await curriculumStore.getCareerWithId(careerId);
    carreraActive.value = carrera.data;
    curriculumId.value = route.params.id;
    console.log('id=', curriculumId);
    console.log('carreraActive=', carreraActive.value);

    const globalVar = inject('globalAreaSelected');
    console.log('-1-->', globalVar);

    console.log('mensaje=', inject('message'));

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
            <v-btn class="mr-2" color="primary" @click="onSave">
                Guardar
            </v-btn>
        </v-row>

        <v-row align="center" justify="center">
            <v-col class="fill-height" height="500">
                <div class="text-center grey d-flex flex-column align-center justify-center" height="100%">
                    <h3>Nueva mallas curriculares</h3>
                    <!-- 
                    <p>{{globalAreaSelected}}</p> -->
                </div>
            </v-col>
        </v-row>

        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-show="false" v-model="curriculumForm.id" />
                        <v-text-field v-show="false" v-model="curriculumForm.careerId" />
                        <v-text-field v-show="false" v-model="curriculumForm.areaId" />
                    </v-col>
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
                <v-btn class="mr-2" color="primary" @click="openNewDialog">
                    <v-icon>mdi-plus</v-icon> Agregar nivel
                </v-btn>
            </v-row>
        </v-form>
        <level-form-comp :title="dialogFormTitle()" :area-obj="area" @submit="submitArea" @close="closeDialog" />



        <v-row>
            <v-col sm="12" md="6" class="mt-4">
                <level-curriculum></level-curriculum>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped></style>