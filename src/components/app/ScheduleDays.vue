<template>
  <div>
    <div class="titulo">
      Días Laborales
    </div>
    <div class="checkbox-container">
    <div v-for="i in diasTexto.length" :key="i" class="checkbox-container">
      <div class="checkboxcomp">
        <input type="checkbox" v-model="days[i-1]" @change="emitChange" />
        <div>{{charIni(diasTexto[i-1]) }}</div>
      </div>
    </div>
  </div>
  </div>
</template>
  
  <script>
export default {
  name: "HorarioDiasSimple",
  data() {
    return {
      days: [true, true, true, true, true, true, false],
      diasTexto: [
        "LUNES",
        "MARTES",
        "MIERCOLES",
        "JUEVES",
        "VIERNES",
        "SABADO",
        "DOMINGO",
      ],
    };
  },
  methods: {
    emitChange() {
      this.$emit("actualizardias", this.days);
    },

    charIni(texto){
      return String(texto).substring(0, 1);
    }
  },
};
</script>
  
  
<style>
.checkbox-container {
  display: flex;
  flex-direction: row;
}
.checkboxcomp {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.checkboxcomp input {
  height: 15px;
  width: 15px;
  margin: 4px;
}

.checkboxcomp div {
  font-size: 10px;
}

.titulo{
  font-size: 12px;
  color: #6c757d;
}
</style>

<!--

    <template>
  <div class="checkbox-container">
    <v-checkbox v-model="days[0]" label="Lunes" />
    <v-checkbox v-model="days[1]" label="Martes" />
    <v-checkbox v-model="days[2]" label="Miércoles" />
    <v-checkbox v-model="days[3]" label="Jueves" />
    <v-checkbox v-model="days[4]" label="Viernes" />
    <v-checkbox v-model="days[5]" label="Sábado" />
    <v-checkbox v-model="days[6]" label="Domingo" />

    <div>Selecciones: {{ selectedDays }}</div>
  </div>
</template>
-->