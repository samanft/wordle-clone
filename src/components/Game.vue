<script setup>
import { ref, defineProps, onMounted } from "vue";
import Row from "./Row.vue";
let currentAttempt = ref(1);

const word = ref([]);

const props = defineProps({
  maxAttempts: {
    type: Number,
    default: 6,
  },
  wordLength: {
    type: Number,
    default: 5,
  },
  selectedDifficulty: {
    type: String,
    default: "Easy",
  },
});

console.log("Props:", props);

const fetchWord = async () => {
  try {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?length=${props.wordLength}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch the word");
    }
    const data = await response.json();
    if (data && data.length > 0) {
      word.value = data[0].split("");
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
  // setTimeout added to ensure the alert is shown after the character color updates
  setTimeout(() => {
    alert("Word correct!");
  }, 0);
};

const handleNextRow = () => {
  currentAttempt.value++;
  if (currentAttempt.value === props.maxAttempts + 1) {
    // setTimeout added to prevent the alert from being triggered if the word is correct on the last attempt
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
      :currentRow="index === currentAttempt"
      :word="word"
      :selectedDifficulty="props.selectedDifficulty"
    />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 50px;
}
</style>
