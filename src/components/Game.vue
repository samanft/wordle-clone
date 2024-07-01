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
    default: 5,
  },
});

const fetchWord = async () => {
  try {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?length=${props.wordLength}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch the word");
    }
    const data = await response.json();
    // Assuming the API returns an array with one word
    if (data && data.length > 0) {
      word.value = data[0].split(""); // Split the word into an array of characters
      console.log("Word fetched:", word.value);
    }
  } catch (error) {
    console.error("Error fetching word:", error);
  }
};

onMounted(() => {
  fetchWord();
});

let gameOverTriggered = false;

const handleWordCorrect = () => {
  gameOverTriggered = true;
  // Directly alert without delay, as this is a state change that should be immediate
  setTimeout(() => {
    alert("Word correct!");
  }, 0);
};

const handleNextRow = () => {
  testCounter.value++;
  // Check if the game is over and the word has not been correctly guessed yet
  if (testCounter.value === props.maxAttempts + 1) {
      // Now, we directly check the condition before showing the alert
      setTimeout(() => {
        if (!gameOverTriggered) {
          alert("Game over!");
        }
      }, 0);
    }
  };
</script>

<template>
  <h1>Welcome to Wordle!</h1>
  <div>
    <Row
      v-for="index in props.maxAttempts"
      :key="index"
      @next-row="handleNextRow"
      @word-correct="handleWordCorrect"
      :currentRow="index === testCounter"
      :word="word"
    />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 50px;
}
</style>
