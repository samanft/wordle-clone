<script setup>
import { ref, defineProps, onMounted } from "vue";
import Row from "./Row.vue";
let testCounter = ref(1);

const word = ref([]);

// Define props to accept maxAttempts
const props = defineProps({
  maxAttempts: {
    type: Number,
    required: true,
    default: 6, // Provide a default value in case it's not passed
  },
  wordLength: {
    type: Number,
    required: true,
    default: 5
  }
});


const fetchWord = async () => {
  try {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${props.wordLength}`);
    if (!response.ok) {
      throw new Error('Failed to fetch the word');
    }
    const data = await response.json();
    // Assuming the API returns an array with one word
    if (data && data.length > 0) {
      word.value = data[0].split(''); // Split the word into an array of characters
    }
  } catch (error) {
    console.error('Error fetching word:', error);
  }
};

onMounted(() => {
  fetchWord();
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
      :word = "word"
    />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 50px;
}
</style>
