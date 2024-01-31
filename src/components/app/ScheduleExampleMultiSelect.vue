<template>
  <v-item-group selected-class="bg-primary" v-model="selected">
    <v-container>

        <p>fff{{ selected }}</p>

      <v-row>
        <v-col v-for="(n, index) in 3" :key="n" cols="12" md="4">
          <v-item :value="index" v-slot="{ isSelected, selectedClass, toggle }">
            <v-card
              :class="['d-flex align-center', selectedClass]"
              dark
              height="200"
              @click="toggle"
            >
              <div class="text-h3 flex-grow-1 text-center">
                {{ isSelected ? 'Selected' : 'Click Me!' }}
              </div>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>
  
  <script>
export default {
  data() {
    return {
      selected: null
    }
  }
}
</script>
  