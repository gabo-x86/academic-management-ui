<template>
  <div>
    <div class="row">
      <div class="contenedorTitle">
        <p class="textoderbtn">{{ filaHoras[0] }}</p>
        <div class="lineaSimple"></div>
      </div>
      <div v-for="j in days.length" :key="j" class="columnTitle contCentro">
        <p>{{ days[j - 1] }}</p>
      </div>
    </div>

    <div v-for="i in rows" :key="i" class="row">
      <div class="contenedorDer">
        <p class="textoderbtn">{{ filaHoras[i] }}</p>
        <div class="lineaSimple"></div>
      </div>
      <div v-for="j in columns" :key="j" class="column"></div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "Horario",
  props: {
    rows: Number,
    columns: Number,
    days: Array,
    filaHoras: Array,
  },
};
</script>
  
  <style>
.row {
  display: flex;
}

.column {
  width: 120px;
  height: 60px;
  border: 1px solid #6c757d;
}

.columnTitle {
  width: 120px;
  height: 30px;
  border: 1px solid #6c757d;
}

.lineaSimple {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 2px; 
  width: 15px; 
  border-bottom: 1px solid #6c757d; 
}

.contenedor {
  position: relative;
  /*border: 1px solid #ccc;*/
  width: 120px;
  height: 60px;
}

.contenedorTitle {
  position: relative;
  width: 120px; 
  height: 30px; 
  border: 0px solid #6c757d; 
}

.contenedorDer {
  position: relative;
  width: 120px; 
  height: 60px; 
  border: 0px solid #6c757d; 
}


.textoderbtn {
  position: absolute;
  right: 0;
  margin: 0px; 
  bottom: -8px;
  margin-right: 20px;
  font-size: 12px;
  color: #6c757d
}

.contCentro {
  position: relative;
  border: 1px solid #6c757d; 
  display: flex;
  align-items: center;
  justify-content: center;
}

.contCentro p{
  color: #6c757d;
  font-size: 13px;
}
</style>
  