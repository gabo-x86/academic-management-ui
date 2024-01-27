<template>
  <v-dialog v-model="editCareerVisible" @update:modelValue="$emit('update:editCareer', $event)">
        <v-card class="card-edit-style">
          <v-card-title>Editar Carrera</v-card-title>
          <v-card-text>
                  <v-sheet width="500" class="mx-auto">
                    <v-form ref="form" @submit.prevent="validateAndSaveEdit">
                      <v-text-field  
                      v-model="model.career.code" label="Código *"  :rules="codeRules"
                      @input="$emit('update:code', $event.target.value)"></v-text-field>
                      <v-text-field   
                      v-model="model.career.name" label="Nombre"  :rules="nameRules"
                      @input="$emit('update:name', $event.target.value)"></v-text-field>
                      <v-text-field 
                      v-model="model.career.initials" label="Sigla" :rules="siglaRules"
                      @input="$emit('update:initials', $event.target.value)"
                      ></v-text-field>
                      <v-text-field  
                      v-model="model.career.description" label="Descripción" :rules="descriptionRules"
                       @input="$emit('update:description', $event.target.value)"
                       ></v-text-field>
                      <v-text-field  
                      v-model="model.career.formattedCreationDate" label="Fecha de fundación" 
                      :rules="creationDateRules" 
                      prepend-inner-icon="mdi-calendar"
                      @input="$emit('update:creationDate', $event.target.valueAsDate)"
                       ></v-text-field>
                        <v-container  width="500" >
                          <v-row justify="space-around">
                            <v-btn type="submit" class="button-edit-dialoge mt-2 left-button  mr-auto"  
                            color="blue" dark @click.prevent="validateAndSaveEdit(props.editCareerId)">
                              Guardar
                            </v-btn>
                          <v-btn type="button" class=" button-edit-dialoge mt-2 right-button ml-auto " 
                          color="red" dark @click="closeEditDialog">Cancelar</v-btn>
                        </v-row>
                        </v-container>
                      </v-form>
                    </v-sheet>
          </v-card-text>
        </v-card>
      </v-dialog>
    
    </template>
    
    <script setup>
import { ref, reactive, watch, getCurrentInstance} from 'vue';
import { useCareerStore } from '@/stores/admin/configgeneral/careerStore';
import { format} from 'date-fns';

const props = defineProps(['editCareer', 'model', 'editCareerId', 'onSaved']);
const { emit } = getCurrentInstance()
const form = ref(null)
const editCareerVisible = ref(props.editCareer);
const codeRules = [
  value => {
    if (!value) {
      return 'The code is required.';
    }
    if (value?.length >= 3) {
      const specialCharacters = /[!@#$%^&*(),.?":{}|<>\/\\]/;
      if (!specialCharacters.test(value)) {
        return true;
      } else {
        return 'The code cannot contain special characters.';
      }
    } else {
      return 'The code must have at least 3 characters.';
    }
  },
];

const nameRules = [
  value => {
    if (!value) {
      return 'The name is required.';
    }
    if (value?.length >= 3 && value?.length <= 90) {
      const containsNumbers = /\d/;
      const specialCharacters = /[!@#$%^&*(),.?":{}|<>\/\\]/;

      if (!containsNumbers.test(value) && !specialCharacters.test(value)) {
        return true;
      } else {
        return 'The name cannot contain numbers or special characters.';
      }
    } else {
      return 'The name must have at least 3 characters and at most 90 characters.';
    }
  },
];

const siglaRules = [
  value => {
    if (!value) {
      return 'The initials are required.';
    }
    if (value?.length >= 3 && value?.length <= 10) {
      const specialCharacters = /[!@#$%^&*(),.?":{}|<>\/\\]/;
      if (!specialCharacters.test(value)) {
        return true;
      } else {
        return 'The initials cannot contain special characters.';
      }
    } else {
      return 'The initials must have at least 3 characters and at most 10 characters.';
    }
  },
];

const descriptionRules = [
  value => {
    if (!value) {
      return 'The description is required.';
    } else {
      return true;
    }
  },
];

const creationDateRules = [
  value => {
    if (!value) {
      return 'The creation date is required.';
    }
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>\/\\a-zA-Z]/;
    if (specialCharacters.test(value)) {
      return 'The creation date cannot contain special or alphabetical characters.';
    }
    const currentDate = format(new Date(), 'dd-MM-yyyy', { timezone: 'GMT-4' });
    if (value > currentDate) {
      return 'The creation date cannot be later than the current date.';
    }
    return true;
  },
];


const model = reactive({
  career: {
    area: { id: null },
    name: props.model?.name || '',
    initials: props.model?.initials || '',
    description: props.model?.description || '',
    code: props.model?.code || '',
    creationDate: props.model?.creationDate || '',
  },
});

watch(() => props.editCareer, newValue => {
  editCareerVisible.value = newValue;
});

watch(() => props.editCareerId, newId => {
  getCareerById(newId);
});
const closeEditDialog = () => {
  emit('close-dialogEdit', false);
};

const validateAndSaveEdit = async careerId => {
  const { valid } = await form.value.validate()

  if (valid) {
    await saveCareerEdit(careerId);
    props.onSaved();
    emit('saved');
    emit('close-dialogEdit', false);
  } else {
  }
};


const getCareerById = async careerId => {
  await useCareerStore().getCareerById(careerId);
  console.log(useCareerStore().currentCareer);
  model.career = useCareerStore().currentCareer;
  model.career.creationDate = new Date(model.career.creationDate);
  model.career.creationDate = format(model.career.creationDate, 'dd-MM-yyyy', { timezone: 'GMT-4' });
  console.log(model.career.creationDate);
};

const saveCareerEdit = async careerId => {
  await useCareerStore().saveCareerEdit(careerId);
  const currentCareer = useCareerStore().currentCareer;
  model.career = currentCareer
};


</script>
  
  <style scoped>
  
  .card-edit-style {
      width: 600px;
      height: 600px;
      align-self: center;
      text-align: center;
    }
    
    .button-edit-dialoge {
      width: 180px;
      height: 60px;
      border-radius: 15px;
    }
    .eliminar-letra {
  font-family: sans-serif;
  font-weight: bold; 
  font-size: 24px;
   }
  
  </style>