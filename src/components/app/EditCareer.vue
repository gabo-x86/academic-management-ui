<template>
    <v-dialog v-model="editCareerVisible" @update:modelValue="$emit('update:editCareer', $event)">
          <v-card class="card-edit-style">
            <v-card-title>Editar Carrera</v-card-title>
            <v-card-text>
                    <v-sheet width="500" class="mx-auto">
                      <v-form ref="form">
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
                        v-model="model.career.creationDate" label="Fecha de fundación" :rules="creationDateRules" 
                        prepend-inner-icon="mdi-calendar" 
                        @input="$emit('update:creationDate', $event.target.valueAsDate)"
                         ></v-text-field>
                         <v-text-field  
                           v-model="model.career.area.id" label="Id del Area" :rules="areaRules"
                           @input="$emit('update:area', $event.target.value)"
                         ></v-text-field>
                          <v-container  width="500" >
                            <v-row justify="space-around">
                            <v-btn type="submit" class=" button-edit-dialoge mt-2 left-button  mr-auto "  
                            color="blue" dark @click="validateAndSave(editCareerId)">Guardar</v-btn>
                            <v-btn type="submit" class=" button-edit-dialoge mt-2 right-button ml-auto " 
                            color="red" dark @click="closeEditDialog">Cancelar</v-btn>
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
      props: ['editCareer', 'model', 'editCareerId'],
      inject: ['refreshCareers'],
       
      data() {
        return {
        editCareerVisible: this.editCareer,
        fechaChange: '',
            
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
                const specialCharacters = /[!@#$%^&*(),?":{}|<>\/\\]/;

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
      creationDateRules: [
        value => {
              if (!value) {
                return 'The creation date is required.'
              }
              const specialCharacters = /[!@#$%^&*(),.?":{}|<>\/\\a-zA-Z]/;
                if (specialCharacters.test(value)) {
                  return 'The creation date cannot contain special or alphabetical characters.';
                }
              this.fechaChange = new Date()
              this.fechaChange = this.fechaChange.toISOString();
               this.fechaChange= this.fechaChange.split('T')[0];
               console.log(this.fechaChange);
              if (value > this.fechaChange) {
                return 'The creation date cannot be later than the current date.'
              }
              return true;
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
            creationDate: this.creationDate,
          }
        }
        };
      },
      watch: {
        editCareer(newValue) {
      this.editCareerVisible = newValue;
    },
    editCareerId(newId) {
    this.getCareerById(newId);
  },
  },
      methods: {
        closeEditDialog() {
            this.$emit('close-dialogEdit', false);
            },
        async validateAndSave(careerId) {
            const { valid } = await this.$refs.form.validate()

            if (valid) {
              this.saveCareerEdit(careerId);
            }else{
              alert('Form is invalid');
            }
          },
        getCareerById(careerId){
            axios.get(`http://localhost:8080/admin/areas/2/careers/${careerId}`).then(res=>{
          console.log(res)
          const career = res.data;
          career.creationDate = new Date(career.creationDate);
          career.creationDate = career.creationDate.toISOString();
          career.creationDate = career.creationDate.split('T')[0];
          this.model.career = career;
        }).catch( function(error){

        })
        },
      saveCareerEdit(careerId) { 
        axios.put(`http://localhost:8080/admin/areas/2/careers/${careerId}`, this.model.career)
        .then(res =>{
          alert('Career was saved succesful');
          console.log(this.model.career)
          console.log(this.model.career.creationDate)
          this.refreshCareers()
          this.$emit('close-dialogEdit', false);
        }).catch(function (error){
    
        })
      }, 
   
      },
      mounted(){
        if (this.careerId) { 
            this.getCareerById(this.careerId)
        }
      }
    }
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
    
    </style>