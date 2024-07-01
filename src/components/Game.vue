<script setup>
import { ref, defineProps } from "vue";
import Row from "./Row.vue";
let testCounter = ref(1);

// Define props to accept maxAttempts
const props = defineProps({
  maxAttempts: {
    type: Number,
    required: true,
    default: 5 // Provide a default value in case it's not passed
  }
});
</script>

<template>
  <h1>Welcome to Wordle!</h1>
  <div>
    <Row
      v-for="index in props.maxAttempts"
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
