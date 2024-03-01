<script setup>
import {onMounted, ref} from 'vue'
import {useRoute} from "vue-router";
import { useSubjectStore } from "@/stores/admin/configgeneral/subjectStore.js";
import { useClassroomStore } from "@/stores/admin/configgeneral/classroomStore.js";
import { useItineraryGroupStore } from "@/stores/admin/schedule/groupItineraryStore.js";
import { useItineraryStore } from "@/stores/admin/schedule/itineraryStore.js";


const route = useRoute();
const subjectStore=useSubjectStore()
const classroomStore = useClassroomStore()
const itineraryGroupStore = useItineraryGroupStore()
const itineraryStore=useItineraryStore()

const dialogVisible = ref(false);
const selectedOption = ref('option3');
const rows =ref([])
const rowsB=rows

const proffessor =[{id:1, name:'BORIS CALANCHA NAVIA'},{id:2, name:'LETICIA BLANCO COCA'}]

const headers = ref([
  { title: 'Dia', value: 'dayOfWeek', align: 'center' },
  { title: 'Horario Inicio',align:'start', key: 'startTime' , style: 'font-weight: bold;'},
  { title: 'Horario Fin',align:'start', key: 'endTime' },
  { title: 'Aula',align:'start', key: 'classroomId' },
  { title: 'Docente',align:'start', key: 'professorId' },
  { title: 'Opcion', align:'center' ,sortable: false, key: 'actions' }
])

const careerId = ref(null)
const itineraryId=ref(null)
const areaID = ref(null)
const selectedSubject = ref(null)
const identGroup=ref('')
const remark=ref('')

areaID.value=route.params.areaId
careerId.value=route.params.careerId
itineraryId.value=route.params.itineraryId

console.log('areaId: '+areaID.value)

onMounted( async ()=>{
  await subjectStore.getSubjects(areaID.value)
  await classroomStore.getClassrooms(areaID.value)
  await itineraryStore.getItineraryById(itineraryId.value)
  console.log("itinerary_ID:"+itineraryStore.currentItinerary.curriculumId)
  console.log(selectedSubject)
})
const newRow = ref({});
const onSubmit = async ()=>{
  const groupItinerary ={
    itineraryId:itineraryStore.currentItinerary.id,
      curriculumId:itineraryStore.currentItinerary.curriculumId,
      subjectId:selectedSubject.value ,
      identifier:identGroup.value,
      remark:remark.value,
      listSchedule:rows.value
  }
    await itineraryGroupStore.createItineraryGroup(
        areaID.value,
        careerId.value,
        itineraryId.value,
        groupItinerary)
    clean()
}

const openDialog = () => {
  dialogVisible.value = true;
  console.log(selectedSubject.value)
};

const closeDialog = () => {
  dialogVisible.value = false;
  restForm();
};

const addRow = () => {
    rows.value.push({ ...newRow.value });
    console.log(JSON.stringify(rows.value))
    closeDialog();
};

const restForm = () => {
  newRow.value = {
    dayOfWeek: '',
    startTime: '',
    endTime:'',
    classroomId:null,
    professorId:null
  };
};
const deleteRow = (item) => {
  const index = rows.value.indexOf(item);
  rows.value.splice(index, 1);
};

const clean=()=>{
  rows.value = [];
  selectedSubject.value=null
  identGroup.value=null
}
const className = ref('')
const nameClassroom = async (id) =>{
  await classroomStore.getClassroomById(id);
  className.value = classroomStore.currentClassroom.name;
  console.log(className);
  return className
}


const ChangeDayOfWeek = (dayOfWeek) => {
  switch (dayOfWeek) {
    case 'MONDAY':
      return 'LU';
    case 'TUESDAY':
      return 'MA';
    case 'WEDNESDAY':
      return 'MI';
    case 'THURSDAY':
      return 'JU';
    case 'FRIDAY':
      return 'VI';
    case 'SATURDAY':
      return 'SA';
    case 'SUNDAY':
      return 'DO';
    default:
      return dayOfWeek;
  }

}
let rules=ref(false)
const typeRules = [
  value => {
    if (!value) {
      return 'This is required.'
    } else {
      rules=true
      return true
    }
  },
]


</script>

<template>
  <v-card
  class="mx-auto my-16"
  min-width="1000"
  max-width="700"
>
    <div class="d-flex flex-row-reverse">
    <v-btn
      class="mx-10"
      color="primary"
      width="200"
      height="50"
      :to="'/admin/areas/'+areaID+'/careers/'+careerId+'/itineraries/'+itineraryId+'/edit'">
      <<< volver
    </v-btn>
    </div>
    <p class="text-center text-h5 font-weight-bold my-4" >
      Crear Grupo
    </p>
    <v-card >
      <v-row class="mx-auto my-1">
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-select
              v-model="selectedSubject"
              :items="subjectStore.subjects"
              label="Asignatura *"
              :item-title="'name'"
              :item-value="'id'"
              variant="outlined"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
              v-model="identGroup"
              label="Identificador de grupo *"
              variant="outlined"
              class="mx-4"
          ></v-text-field>
        </v-col>

      </v-row>
  <v-card-text>
    <v-dialog v-model="dialogVisible" persistent class="mx-auto my-16"
              min-width="500"
              max-width="600">
      <v-card>
        <v-card-title>
          <span class="text-h5">Añadir Itinerario</span>
        </v-card-title>
        <v-form ref="form" @submit.prevent="addRow">
          <v-card-text>
            <v-container>
              <v-select
                  v-model="remark"
                  label="Periodo"
                  :items="['plan nuevo 2021', 'plan nuevo 2022', 'plan nuevo 2023']"
                  variant="outlined"
              ></v-select>
              <v-row>
                <v-col>
                  <v-select
                      v-model="newRow.dayOfWeek"
                      label="Dia *"
                      :items="['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']"
                      variant="outlined"
                      :rules="typeRules"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                      v-model="newRow.startTime"
                      label="Hora inicio *"
                      type="time"
                      suffix="hrs"
                      variant="outlined"
                      :rules="typeRules"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                      v-model="newRow.endTime"
                      label="Hora fin *"
                      type="time"
                      suffix="hrs"
                      variant="outlined"
                      :rules="typeRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <p class="my-4">Seleccione una opción</p>
              <v-radio-group inline v-model="selectedOption">
                <v-radio label="Docente" value="option1" class="mx-4"></v-radio>
                <v-radio label="Asistente" value="option2" class="mx-4"></v-radio>
                <v-radio label="Por designar" value="option3"  class="mx-4"></v-radio>
              </v-radio-group>
              <v-select
                  v-model="newRow.professorId"
                  label="Docente"
                  :item-title="'name'"
                  :item-value="'id'"
                  :items="proffessor"
                  :disabled="selectedOption === 'option3' || selectedOption === 'option2'"
                  variant="outlined"
              ></v-select>
              <v-select
                  v-model="newRow.classroomId"
                  label="Aula *"
                  :items="classroomStore.classrooms"
                  :item-title="'name'"
                  :item-value="'id'"
                  :rules="typeRules"
                  variant="outlined"
              ></v-select>

            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeDialog"> Cancelar </v-btn>
            <v-btn type="submit" color="blue-darken-1" variant="text"> Añadir </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="rows"
      density="compact"
      item-key="name">
      <template v-slot:item.dayOfWeek="{ item }">
        {{ ChangeDayOfWeek(item.dayOfWeek) }}
      </template>
      <template v-slot:item.classroomId="{ item }">
        {{ nameClassroom(item.classroomId) }}
      </template>
      <template v-slot:item.professorId="{ item }">
        {{ item.professorId ? item.professorId:'Por designar' }}
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Horario</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="openDialog">
            Nuevo
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-row justify="space-around">
          <v-btn variant="text" >
            <v-icon icon="mdi-close-circle-outline" color="red" @click="deleteRow(item)"></v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-table>
<pre>test: {{ nameClassroom(1)+' otro:' }}</pre>
  </v-card-text>
    </v-card>
    <v-form ref="form" @submit.prevent="onSubmit">
    <v-row justify="end" class="my-2">
      <v-col cols="3">
        <v-btn
            class="mx-4"
            color="primary"
            width="200"
            height="50"
            @click="clean"
        >
          Cancelar
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
            class="mx-4"
            color="primary"
            width="200"
            height="50"
            type="submit"
        >
          Guardar
        </v-btn>
      </v-col>
    </v-row>
    </v-form>
</v-card>
</template>

<style scoped>

</style>