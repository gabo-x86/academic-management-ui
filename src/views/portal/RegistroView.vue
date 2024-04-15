<script setup>
import { useForm, useField } from 'vee-validate'
import { onMounted, ref } from 'vue'
import * as yup from 'yup'

var step = ref(0)

const next = () => {
  step.value++
}
//--------Form 1------------------------------
const schema = yup.object().shape({
  ci: yup
    .string()
    .required('El C.I. es requerido')
    .matches(/^[\d]+$/, 'El C.I. solo puede contener números')
    .min(5, 'El C.I. debe contener como mínimo 5 digitos')
    .max(10, 'El C.I. debe contener como máximo 10 digitos'),
  emitted: yup.string().required('El departamento donde fue emitido es requerido'),
  dateBirth: yup
    .string()
    .required('La fecha de nacimiento es requerida')
    .matches(/^\d{4}[-\/]\d{2}[-\/]\d{2}$/, 'El formato de fecha debe ser YYYY-MM-DD o YYYY/MM/DD')
    .test(
      'no debe ser mayor que hoy',
      'La fecha no puede ser mayor que la fecha actual',
      (value) => {
        const fecha = new Date(value)
        const fechaActual = new Date()
        return fecha <= fechaActual
      }
    ),
  name: yup.string().required('El nombre es requerido'),
  lastNameP: yup.string().required('El apellido paterno es requerido'),
  lastNameM: yup.string().required('El apellido materno es requerido'),
  gender: yup.string().required('El género es requerido'),
  address: yup.string().required('La dirección es requerida'),
  nationality: yup.string().required('La nacionalidad es requerida'),
  email: yup.string().required('El email es requerido').email('Debe ser un email válido'),
  password: yup.string().required('La contraseña es requerida'),
  passwordConfirm: yup
    .string()
    .required('La confirmación es requerida')
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema
})

const ci = useField('ci', schema)
const emitted = useField('emitted', schema)
const dateBirth = useField('dateBirth', schema)
const name = useField('name', schema)
const lastNameP = useField('lastNameP', schema)
const lastNameM = useField('lastNameM', schema)
const gender = useField('gender', schema)
const address = useField('address', schema)
const nationality = useField('nationality', schema)
const email = useField('email', schema)
const password = useField('password', schema)
const passwordConfirm = useField('passwordConfirm', schema)

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  console.log('onSubmit')
  const userData = {
    idNumber: values.ci,
    issuedIn: values.emitted,
    dateOfBirth: values.dateBirth,
    firstNames: values.name,
    paternalLastName: values.lastNameP,
    maternalLastName: values.lastNameM,
    nationality: values.nationality,
    gender: values.gender,
    cellPhoneNumber: 'string',
    email: values.email,
    currentAddress: values.address,
    careerId: 0,
    password: values.password
  }

  console.log(userData)
  resetForm()
  step.value++
})
//------------------------------------------------
</script>
<template>
  <v-container>
    <v-stepper v-model="step">
      <template v-slot:default="{ prev }">
        <v-stepper-header>
          <v-stepper-item
            :complete="step > 0"
            :color="step > 0 ? 'green' : ''"
            title="Paso 1 - Datos personales"
            value="1"
          ></v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item
            :complete="step > 1"
            :color="step > 1 ? 'green' : ''"
            title="Paso 2 - Subir fotografía"
            value="2"
          ></v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item
            :complete="step > 2"
            :color="step > 2 ? 'green' : ''"
            title="Paso 3 - Documentos oficiales"
            value="3"
          ></v-stepper-item>
        </v-stepper-header>

        <v-stepper-window>
          <v-stepper-window-item value="1">
            <v-form @submit.prevent="onSubmit">
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    label="Nro. de C.I."
                    v-model="ci.value.value"
                    :error-messages="ci.errorMessage.value"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-select
                    :items="['CB', 'SC']"
                    label="Emitido en"
                    v-model="emitted.value.value"
                    :error-messages="emitted.errorMessage.value"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Fecha de Nacimiento"
                    prepend-inner-icon="mdi-calendar"
                    v-model="dateBirth.value.value"
                    :error-messages="dateBirth.errorMessage.value"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-text-field
                    label="Nombres"
                    v-model="name.value.value"
                    :error-messages="name.errorMessage.value"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Apellido Paterno"
                    v-model="lastNameP.value.value"
                    :error-messages="lastNameP.errorMessage.value"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Apellido Materno"
                    v-model="lastNameM.value.value"
                    :error-messages="lastNameM.errorMessage.value"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4"
                  ><v-select
                    :items="['Hombre', 'Mujer']"
                    label="Sexo"
                    v-model="gender.value.value"
                    :error-messages="gender.errorMessage.value"
                  ></v-select
                ></v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Dirección actual"
                    v-model="address.value.value"
                    :error-messages="address.errorMessage.value"
                  ></v-text-field>
                </v-col>
                <v-col cols="4"
                  ><v-select
                    :items="['B', 'A']"
                    label="Nacionalidad"
                    v-model="nationality.value.value"
                    :error-messages="nationality.errorMessage.value"
                  ></v-select
                ></v-col>
              </v-row>

              <v-row>
                <v-col cols="4"
                  ><v-text-field
                    label="Email"
                    v-model="email.value.value"
                    :error-messages="email.errorMessage.value"
                  >
                  </v-text-field
                ></v-col>
                <v-col cols="4"
                  ><v-text-field
                    label="Contraseña"
                    type="password"
                    v-model="password.value.value"
                    :error-messages="password.errorMessage.value"
                  >
                  </v-text-field
                ></v-col>
                <v-col cols="4"
                  ><v-text-field
                    label="Confirmar contraseña"
                    type="password"
                    v-model="passwordConfirm.value.value"
                    :error-messages="passwordConfirm.errorMessage.value"
                  >
                  </v-text-field
                ></v-col>
              </v-row>
              <v-stepper-actions prev-text="Anterior" @click:prev="prev" disabled="prev">
                <template v-slot:next>
                  <v-btn type="submit" class="v-stepper__action"> Siguiente </v-btn>
                </template>
              </v-stepper-actions>
            </v-form>
          </v-stepper-window-item>

          <v-stepper-window-item value="2">
            <span>2</span>
            <v-stepper-actions prev-text="Anterior" @click:prev="prev" disabled="prev">
              <template v-slot:next>
                <v-btn type="submit" class="v-stepper__action" @click="next"> Siguiente </v-btn>
              </template>
            </v-stepper-actions>
          </v-stepper-window-item>

          <v-stepper-window-item value="3">
            <span>3</span>
            <v-stepper-actions prev-text="Anterior" @click:prev="prev" disabled="prev">
              <template v-slot:next>
                <v-btn type="submit" class="v-stepper__action" @click="next"> Siguiente </v-btn>
              </template>
            </v-stepper-actions>
          </v-stepper-window-item>
        </v-stepper-window>
      </template>
    </v-stepper>
  </v-container>
</template>


