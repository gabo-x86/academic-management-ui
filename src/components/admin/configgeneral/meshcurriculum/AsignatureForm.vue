<script setup>
import { onMounted, ref, watch } from 'vue'
import { useSubjectStore } from '@/stores/admin/configgeneral/subjectStore';

const subjectStore = useSubjectStore();
const asignaturaForm = ref({
    id: null,
    name: '',
    initials: '',
    description: ''
});
const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(['update:modelValue']);

function close() { emit('update:modelValue', false); }

onMounted(async () => {
  await subjectStore.getSubjects(1);
});
</script>
<template>
    <v-dialog :model-value="modelValue" width="700">
        <v-card>
            <v-card-title>
                <span class="text-h5">Añadir Asignatura  Nivel A</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-select label="Asignatura *" :items="subjectStore.subjects" :item-title="'name'" :item-value="'id'" required></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-show="false" v-model="asignaturaForm.id" />
                            <v-text-field label="Carga horaria *" v-model="asignaturaForm.name" required />
                        </v-col>
                        <v-col cols="12">
                            <v-select label="Requisitos" :items="subjectStore.subjects" :item-title="'name'" :item-value="'id'" multiple></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-checkbox label="Electiva"></v-checkbox>
                        </v-col>
                    </v-row>
                </v-container>
                <small>(*) Indica campo requerido</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">Cerrar</v-btn>
                <v-btn color="blue-darken-1" variant="text">Guardar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>