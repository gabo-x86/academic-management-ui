<script setup>

</script>

<template>
    <div class="pa-4">
        <div class="py-4 mx-lg-auto">
            <p><strong>Carrera: </strong>Ing. de Sistemas</p>
        </div>
        <v-row class="justify-end">
            <v-btn class="mr-2" color="primary">
                Simular
            </v-btn>
            <v-btn class="mr-2" color="primary">
                Guardar
            </v-btn>
        </v-row>

        <v-row align="center" justify="center">
            <v-col class="fill-height" height="500">
                <div class="text-center grey d-flex flex-column align-center justify-center" height="100%">
                    <h3>Nueva mallas curriculares</h3>
                    <p>{{globalAreaSelected}}</p>
                    <p>Parámetro idCarrera: {{ $route.params.idCarrera }}</p>
                </div>
            </v-col>
        </v-row>

        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-col
                    cols="12"
                    md="6"
                    >
                    <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        :counter="50"
                        label="Nombre"
                        required
                        hide-details
                    ></v-text-field>
                    </v-col>

                    <v-col
                    cols="12"
                    md="6"
                    >
                    <v-text-field
                        v-model="lastname"
                        :rules="nameRules"
                        :counter="10"
                        label="Número Minimo de Asignaturas Aprobadas"
                        hide-details
                        required
                    ></v-text-field>
                    </v-col>

                    <v-col
                    cols="12"
                    md="6"
                    >
                        <v-text-field type="date" label="Fecha inicio"></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                    >
                        <v-text-field type="date" label="Fecha fin"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>

        <v-row class="justify-end">
            <v-btn class="mr-2" color="primary">
                <v-icon>mdi-plus</v-icon> Agregar nivel
            </v-btn>
        </v-row>
    </div>
</template>

<style scoped>

</style>