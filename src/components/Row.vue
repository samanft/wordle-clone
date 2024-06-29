<script setup>
import { ref, onMounted, defineProps, defineEmits, watchEffect } from "vue";

const props = defineProps({
  currentRow: Boolean,
});

const emits = defineEmits(["next-row"]);

const inputs = ref([null, null, null, null, null]);
const lastFocusedInput = ref(null); // Define lastFocusedInput here
const isInputHandling = ref(false); // Flag to indicate input handling operation


const word = ["b", "e", "a", "r", "d"];
const letterStates = ref(new Array(word.length).fill("")); // Initialize with empty states

const checkWord = () => {
  const inputValues = inputs.value.map((input) => input.value);
  for (let i = 0; i < inputValues.length; i++) {
    if (inputValues[i] === word[i]) {
      letterStates.value[i] = "correct";
    } else if (word.includes(inputValues[i])) {
      letterStates.value[i] = "wrong-position";
    }
  }
};

const handleInput = (e) => {
  isInputHandling.value = true; // Indicate input handling starts

  if (!e.key.match(/^[a-zA-Z]$/) && e.key !== "Backspace") {
    e.preventDefault();
    isInputHandling.value = false; // Reset flag if input is prevented
    return;
  }

  const index = inputs.value.findIndex((input) => input === e.target);
  if (e.target.value.length === 1) {
    if (index === inputs.value.length - 1) {
      isInputHandling.value = true; // Reset flag if input is prevented
      console.log(isInputHandling.value)
      checkWord();
      console.log(isInputHandling.value)
      emits("next-row");
    } else {
      inputs.value[index + 1].focus();
    }
  } else if (index > 0) {
    inputs.value[index - 1].focus();
    inputs.value[index - 1].value = "";
  }

  setTimeout(() => {
  isInputHandling.value = false; // Reset flag after handling input
}, 0);};

const handleFocus = (e) => {
  lastFocusedInput.value = e.target; // Update last focused input on focus
};

const handleBlur = () => {
  console.log(isInputHandling.value)
  if (!isInputHandling.value) { // Only refocus if not handling input
    console.log(isInputHandling.value)
    console.log('refocus')
    lastFocusedInput.value?.focus();
  }
};

onMounted(() => {
  watchEffect(() => {
    if (props.currentRow && inputs.value[0]) {
      inputs.value[0].focus();
    }
  });
});

const inputCount = word.length;
</script>

<template>
  <div>
    <input
      v-for="index in inputCount"
      :key="index"
      type="text"
      maxlength="1"
      @keyup="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      :ref="(el) => (inputs[index - 1] = el)"
      :class="letterStates[index - 1]"
      :aria-label="`Letter ${index}`"
    />
  </div>
</template>

<style scoped>
input[type="text"] {
  width: 60px; /* Makes the input square in shape */
  height: 60px;
  text-align: center; /* Centers the text */
  background-color: #3a3a3c;
  border: none;
  margin-right: 5px;
  margin-bottom: 10px;
  caret-color: transparent; /* Makes the caret invisible */
  text-transform: uppercase; /* Automatically capitalize letters */
  font-family: "Libre Franklin", sans-serif;
  font-size: 24px;
  outline: none;
}

input[type="text"].wrong-position {
  background-color: #b59f3b;
}

input[type="text"].correct {
  background-color: #538d4e;
}

* {
  color: white;
}
</style>
