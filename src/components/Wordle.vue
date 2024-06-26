<script setup>
import { ref, onMounted } from 'vue';

const inputs = ref([null, null, null, null, null]);

const woord = ['h', 'e', 'l', 'l', 'o'];

const logCharCount = (e) => {
  if (!e.key.match(/^[a-zA-Z]$/) && e.key !== 'Backspace') {
    e.preventDefault();
    return;
  }

  console.log(e.target.value.length);
  const index = inputs.value.findIndex(input => input === e.target);
  if (e.target.value.length === 1) {
    inputs.value[index + 1].focus();
  } else {
    inputs.value[index - 1].focus();
  }
};

onMounted(() => {
  if (inputs.value[0]) {
    inputs.value[0].focus();
  }
});

const inputCount = woord.length; // Assuming you want 5 inputs


</script>

<template>
  <div>
    <input v-for="index in inputCount" :key="index" type="text" maxlength="1" @keyup="logCharCount"
           :ref="el => inputs[index - 1] = el" />
  </div>
</template>

<style scoped>
input[type="text"] {
  width: 50px; /* Makes the input square in shape */
  height: 50px;
  text-align: center; /* Centers the text */
}
</style>