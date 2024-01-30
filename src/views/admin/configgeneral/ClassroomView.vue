<script setup>
import {onMounted, ref} from "vue";
import { useMainStore } from "@/stores/globalArea.js";
import { useClassroomStore } from "@/stores/admin/configgeneral/classroomStore.js";
import { useAreaStore} from "@/stores/admin/configgeneral/areaStore.js";
import ClassroomFrom from '@/components/app/ClassroomForm.vue'//
import ClassroomEdit from "@/components/app/ClassroomEdit.vue";//
import ClassroomDelete from "@/components/app/ClassroomDelete.vue";//

const mainStore = useMainStore()
const classroomStore = useClassroomStore()
const areaStore= useAreaStore()

const createClassroom = ref(false)
const editClassroom = ref(false)
const deleteClassroom = ref(false)
const editClassroomId = ref(0)
const deleteClassroomId=ref(0)
const classrooms=ref([])
const classroomsReady=ref(false)

const setEditClassroomId = (areaId)=>{
  editClassroomId.value=areaId
  editClassroom.value=true
}

const setDeleteClassroomId=(id) =>{
  deleteClassroomId.value=id
  deleteClassroom.value=true
}

const updateEditClassroom = (value)=>{
  if(value===false){
    console.log(editClassroom.value);
  }
  editClassroom.value=value;
}

const updateDeleteClassroom=(value) =>{
  if(value===false){
    console.log(deleteClassroom.value)
  }
  deleteClassroom.value=value
}

const reloadTable= async ()=>{
  await classroomStore.getClassrooms(mainStore.areaId)
  classroomsReady.value = true;
  console.log(classroomStore.classrooms);
}



const headers = ref([
  { title: 'N°', value: 'index', align: 'center' },
  { title: 'Sigla',align:'center', key: 'initials' , style: 'font-weight: bold;'},
  { title: 'Nombre',align:'center', key: 'name' },
  { title: 'Tipo',align:'center', key: 'type' },
  { title: 'Direccion',align:'center', key: 'address' },
  { title: 'Opciones', align:'center' ,sortable: false, key: 'actions' }
]);

onMounted( async ()=>{
  await classroomStore.getClassrooms(mainStore.areaId);
  classroomsReady.value=true
  console.log(classroomStore.classrooms)
})



</script>
<template>
  <v-card
      class="mx-auto my-16"
      min-width="1000"
      max-width="1300"
  >
    <p class="text-center text-h5 font-weight-bold my-4" >
      Lista de Aulas
    </p>

      <div class="d-flex flex-row-reverse">
        <v-btn
            v-if="classroomsReady"
            class="mx-9 my-4"
            color="primary"
            width="200"
            height="50"
            @click="createClassroom = true">
          <template v-slot:prepend>
            <v-icon class="white-icon">mdi-plus</v-icon>
          </template>
          Nuevo
        </v-btn>
      </div>

    <classroom-from
        v-model:createClassroom="createClassroom"
        v-model:initials="initials"
        v-model:name="name"
        v-model:type="type"
        v-model:address="address"
        v-model:area="area"
        @update:initials="value=>initials=value"
        @update:name="value=>name=value"
        @update:type="value=>type=value"
        @update:address="value=>address=value"
        @update:area="value=>area=value"
        :onSaved="reloadTable"
        @close-dialog="createClassroom=false"
    ></classroom-from>

    <classroom-delete
        v-model:deleteClassroom="deleteClassroom"
        :deleteClassroomId="deleteClassroomId"
        @close-deleteDialog="updateDeleteClassroom"
    >
    </classroom-delete>

    <classroom-edit
        v-model:editClassroom="editClassroom"
        :editClassroomId="editClassroomId"
        @close-dialogEdit="updateEditClassroom"
        :onSaved="reloadTable"
    ></classroom-edit>


    <v-card-text>
      <v-data-table
          v-if="classroomsReady"
          :headers="headers"
          :items="classroomStore.classrooms.map((item, index) => ({ ...item, index: index + 1 }))"
          density="compact"
          item-key="name"
      >
        <template v-slot:[`item.actions`]="{ item }">

          <v-row justify="space-around">
            <v-btn variant="text" @click="setEditClassroomId(item.id)">
              <v-icon icon="mdi-pencil"></v-icon>
              editar
            </v-btn>
            <v-btn variant="text" @click="setDeleteClassroomId(item.id)">
              <v-icon icon="mdi-delete"></v-icon>
              eliminar
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>