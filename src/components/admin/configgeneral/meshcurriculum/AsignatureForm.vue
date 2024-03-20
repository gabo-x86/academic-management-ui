<script setup>
import { onMounted, ref, watch } from 'vue'
import { useSubjectStore } from '@/stores/admin/configgeneral/subjectStore'

const subjectStore = useSubjectStore()
const areaId = 1;
const asignaturaForm = ref({
    // id: null,
    subjectId: '',
    optional: '',
    path: '',
    workload: ''
})
const props = defineProps({
    nivelObj: {
        type: Object,
        required: true
    },
    asignaturaArray: {
        type: Array,
        required: false
    },
    modelValue: Boolean
})
var arrayTemAsig = [];
const emit = defineEmits(['update:modelValue', 'submit'])

function close() {
    emit('update:modelValue', false)
}

function onSave() {
    var multiple = '';
    Array.from(asignaturaForm.value.path).forEach((element) => {
        if(element != '') {
            multiple = multiple+element+', ';
        }
    }
    );
    multiple = multiple.slice(0, multiple.length - 2);
    var obj = {
        "subjectId": asignaturaForm.value.subjectId,
        "optional": asignaturaForm.value.optional,
        "path": multiple,
        "workload": asignaturaForm.value.workload,
    };
    arrayTemAsig.push(obj);

    console.log('array=', arrayTemAsig);
    emit('submit', arrayTemAsig);
    emit('update:modelValue', false);

    asignaturaForm.value = {
        subjectId: '',
        optional: '',
        path: '',
        workload: ''
    };
}

onMounted(async () => {
    await subjectStore.getSubjects(areaId)
})

watch(() => props.asignaturaArray, (ar) => {
    console.log('tam=', ar.length);
    arrayTemAsig = Object.assign([], props.asignaturaArray);
    console.log('props=',props.asignaturaArray);
});
</script>
<template>
    <v-dialog :model-value="modelValue" width="700">
        <v-card>
            <v-card-title>
                <span class="text-h5">Añadir Asignatura {{ props.nivelObj.levelName }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-select label="Asignatura *" :items="subjectStore.subjects" :item-title="'name'"
                                :item-value="'id'" v-model="asignaturaForm.subjectId" required></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-show="false" v-model="asignaturaForm.id" />
                            <v-text-field label="Carga horaria *" v-model="asignaturaForm.workload" required />
                        </v-col>
                        <v-col cols="12">
                            <v-select label="Requisitos" :items="subjectStore.subjects" :item-title="'name'"
                                :item-value="'name'" v-model="asignaturaForm.path" multiple></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-checkbox label="Electiva" v-model="asignaturaForm.optional"></v-checkbox>
                        </v-col>
                    </v-row>
                </v-container>
                <small>(*) Indica campo requerido</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">Cerrar</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="onSave">Guardar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped></style>
