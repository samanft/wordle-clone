<template>
  <div class="options-page">
    <h1>Game Options</h1>
    <form @submit.prevent="updateOptions">
      <div class="form-group">
        <label for="difficulty">Difficulty:</label>
        <select v-model="selectedDifficulty" id="difficulty">
          <option
            v-for="difficulty in difficulties"
            :key="difficulty"
            :value="difficulty"
          >
            {{ difficulty }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="maxAttempts">Max Attempts:</label>
        <input
          type="number"
          v-model.number="maxAttempts"
          id="maxAttempts"
          min="3"
          max="10"
        />
      </div>
      <div class="form-group">
        <label for="maxAttempts">Word length:</label>
        <input
          type="number"
          v-model.number="wordLength"
          id="wordLength"
          min="5"
          max="10"
        />
      </div>
      <button type="submit">Save Options</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Step 1: Import useRouter

const difficulties = ["Easy", "Medium", "Hard"];
const selectedDifficulty = ref("Easy"); // Default selection
const maxAttempts = ref(6); // Default max attempts
const wordLength = ref(5); // Default word length

const router = useRouter(); // Step 2: Use useRouter to get the router instance

function updateOptions() {
  // Here you would typically update the store or emit an event with the new options
  console.log("Options Updated:", selectedDifficulty.value, maxAttempts.value);
  router.push(`/game?maxAttempts=${maxAttempts.value}&wordLength=${wordLength.value}`);
}
</script>

<style>
.options-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="number"],
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

button {
  padding: 10px 15px;
  cursor: pointer;
}
</style>
