<script setup>
import {
  ref,
  onMounted,
  defineProps,
  defineEmits,
  watchEffect,
  computed,
} from "vue";

const props = defineProps({
  currentRow: Boolean,
  word: Array,
});

const word = computed(() => props.word);

const emits = defineEmits(["next-row"]);

const inputs = ref([null, null, null, null, null]);
const lastFocusedInput = ref(null); // Define lastFocusedInput here
const isInputHandling = ref(false); // Flag to indicate input handling operation

const letterStates = ref(new Array(word.length).fill("")); // Initialize with empty states

const checkWord = () => {
  const inputValues = inputs.value.map((input) => input.value.toLowerCase());
  for (let i = 0; i < inputValues.length; i++) {
    if (inputValues[i] === word.value[i].toLowerCase()) {
      letterStates.value[i] = "correct";
    } else if (word.value.includes(inputValues[i])) {
      letterStates.value[i] = "wrong-position";
    } else {
      letterStates.value[i] = "incorrect";
    }
  }
  isInputHandling.value = true;
  emits("next-row");
};

const handleBackspace = (e) => {
  if (e.key === "Backspace" && e.target.value === "") {
    isInputHandling.value = true; // Indicate input handling starts
    const index = inputs.value.findIndex((input) => input === e.target);
    if (index > 0) {
      // Focus the previous input
      inputs.value[index - 1].focus();
      // Clear the previous input
      inputs.value[index - 1].value = "";
      // Prevent the default backspace action to avoid navigating back in history
      e.preventDefault();
    }
    setTimeout(() => {
      isInputHandling.value = false; // Reset flag after handling input
    }, 0);
  } else if (e.key === "Enter") {
    if (inputs.value[inputs.value.length - 1].value === "") {
      // Prevent submitting the row if the last input is empty
      return;
    } else {
      checkWord();
    }
  } else if (!/[a-z]/i.test(e.key)) {
    e.preventDefault();
  }
};
const handleInput = (e) => {
  isInputHandling.value = true; // Indicate input handling starts

  const index = inputs.value.findIndex((input) => input === e.target);
  const currentValue = e.target.value;

  // Clear the input if more than one character is entered, or move to the next input
  if (currentValue.length > 1) {
    // This assumes users are typing fast and might input multiple characters in one event
    // It keeps the last character, simulating fast typing
    e.target.value = currentValue.charAt(currentValue.length - 1);
  }

  if (e.target.value.length === 1) {
    if (index < inputs.value.length - 1) {
      // Focus the next input if the current one is filled
      inputs.value[index + 1].focus();
    } else if (index === inputs.value.length - 1) {
      // // Last input filled, trigger word check
      // checkWord();
      // emits("next-row");
    }
  } else if (e.target.value.length === 0 && index > 0) {
    // If the input is cleared, focus the previous input
    inputs.value[index - 1].focus();
  }

  setTimeout(() => {
    isInputHandling.value = false; // Reset flag after handling input
  }, 0);
};

const handleFocus = (e) => {
  lastFocusedInput.value = e.target; // Update last focused input on focus
};

const handleBlur = () => {
  if (!isInputHandling.value) {
    // Only refocus if not handling input
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

const inputCount = computed(() => word.value.length); // Make inputCount a computed property
</script>

<template>
  <div>
    <input
      v-for="index in inputCount"
      :key="index"
      type="text"
      maxlength="1"
      @input="handleInput"
      @keydown="handleBackspace"
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
  background-color: transparent;
  border: 2px solid #3a3a3c;
  margin-right: 5px;
  margin-bottom: 10px;
  caret-color: transparent; /* Makes the caret invisible */
  text-transform: uppercase; /* Automatically capitalize letters */
  font-family: "Libre Franklin", sans-serif;
  font-size: 24px;
  outline: none;
}

input[type="text"].incorrect {
  background-color: #3a3a3c;
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
