<script setup>
let dialog=false;
</script>
<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
            </template>
            <v-card>
                <v-card-title>
                <span class="text-h5">Añadir Itinerario</span>
                </v-card-title>

                <v-card-text>

                <v-container>
                    <v-row>
                    <v-col cols="12">
                        <v-text-field label="Nombre*" required></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field label="Carrera*" required></v-text-field>
                    </v-col>
                    </v-row>
                </v-container>

                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                    Close
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
  </v-row>
</template>