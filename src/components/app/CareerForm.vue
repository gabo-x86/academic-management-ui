<template>
<v-dialog v-model="dialogVisible" @update:modelValue="$emit('update:crearCarrera', $event)">
      <v-card class="card-style">
        <v-card-title>Añadir Carrera</v-card-title>
        <v-card-text>
                <v-sheet width="500" class="mx-auto">
                  <v-form ref="form" >
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
                       v-model="model.career.area.id" label="Id del Area" :rules="areaRules"
                       @input="$emit('update:area', $event.target.value)"
                     ></v-text-field>
                      <v-container  width="500" >
                        <v-row justify="space-around">
                        <v-btn type="submit" class=" button-dialoge mt-2 left-button  mr-auto "  
                        color="blue" dark @click="validateAndSave">Guardar</v-btn>
                        <v-btn type="submit" class=" button-dialoge mt-2 right-button ml-auto " 
                        color="red" dark @click="closeDialog">Cancelar</v-btn>
                      </v-row>
                      </v-container>
                    </v-form>
                  </v-sheet>
        </v-card-text>
      </v-card>
    </v-dialog>
  
  </template>
  
  <script>
import axios from 'axios';
export default {
  props: ['crearCarrera', 'model'],
  inject: ['refreshCareers'],
   
  data() {
    return {
    dialogVisible: this.crearCarrera,
    
    codeRules: [
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
      ],
      nameRules: [
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
      ],
      siglaRules: [
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
      ],
      descriptionRules: [
        value => {
          if (!value) {
            return 'The description is required.';
          }else{
            return true
          }
        }
      ],
      areaRules: [
        value => {
          if (!value) {
            return 'The area is required.';
          }else{
            return true
          }
        }
      ],

    model:{
      career: {
        area: {id: this.area},
        name: this.name,
        initials: this.initials,
        description: this.description,
        code: this.code,         
        foundationDate: this.foundationDate,
      }
    }
    };
  },
  watch: {
    crearCarrera(newValue) {
      this.dialogVisible = newValue;
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },
    async validateAndSave() {
        const { valid } = await this.$refs.form.validate()

        if (valid) {
          this.saveCareer();
        }else{
          alert('Form is invalid');
        }
      },
     
  saveCareer() {
    axios.post('http://localhost:8080/admin/areas/2/careers', this.model.career)
    .then(res =>{
      alert('Career was saved succesful');
      this.model.career = {
        area: { id: null },
        name: '',
        initials: '',
        description: '',
        code: '',    
        
      }
      console.log(this.model.career)
      this.refreshCareers()
      this.$emit('close-dialog');
    }).catch(function (error){

    })
  } 

  },
    }
  </script>

<style scoped>

.card-style {
    width: 600px;
    height: 600px;
    align-self: center;
    text-align: center;
  }
  
  .button-dialoge {
    width: 180px;
    height: 60px;
    border-radius: 15px;
  }

</style>