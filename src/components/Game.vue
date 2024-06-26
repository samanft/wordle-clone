<script setup>
import { ref } from 'vue';
import Row from "./Row.vue";
let testCounter = ref(1);
</script>

<template>
    <p> {{ testCounter }}</p>
  <Row v-for="index in 5" :key="index" @next-row="testCounter++" :currentRow="index === testCounter"/>
</template>
