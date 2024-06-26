<script setup>
import { ref } from "vue";
import Row from "./Row.vue";
let testCounter = ref(1);
</script>

<template>
  <h1>Welcome to Wordle!</h1>
  <div>
    <Row
      v-for="index in 5"
      :key="index"
      @next-row="testCounter++"
      :currentRow="index === testCounter"
    />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 50px;
}
</style>
