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

const emits = defineEmits(["next-row", "word-correct"]);

const inputs = ref(new Array(word.length).fill(null));
const lastFocusedInput = ref(null);
const isInputHandling = ref(false);

const letterStates = ref(new Array(word.length).fill(""));

const checkWord = () => {
  const inputValues = inputs.value.map((input) => input.value.toLowerCase());
  let isCorrect = true;
  for (let i = 0; i < inputValues.length; i++) {
    if (inputValues[i] === word.value[i].toLowerCase()) {
      letterStates.value[i] = "correct";
    } else if (word.value.includes(inputValues[i])) {
      letterStates.value[i] = "wrong-position";
      isCorrect = false;
    } else {
      letterStates.value[i] = "incorrect";
      isCorrect = false;
    }
  }
  isInputHandling.value = true;
  emits("next-row");
  if (isCorrect) {
    emits("word-correct");
  }
};

const handleBackspace = (e) => {
  if (e.key === "Backspace" && e.target.value === "") {
    isInputHandling.value = true;
    const index = inputs.value.findIndex((input) => input === e.target);
    if (index > 0) {
      inputs.value[index - 1].focus();
      inputs.value[index - 1].value = "";
      e.preventDefault(); // Might delete this line, seems to not make a difference
    }
    setTimeout(() => {
      isInputHandling.value = false;
    }, 0);
  } else if (e.key === "Enter") {
    if (inputs.value[inputs.value.length - 1].value === "") {
      return;
    } else {
      checkWord();
    }
  } else if (!/[a-z]/i.test(e.key)) {
    e.preventDefault();
  }
};
const handleInput = (e) => {
  isInputHandling.value = true;

  const index = inputs.value.findIndex((input) => input === e.target);
  const currentValue = e.target.value;

  if (currentValue.length > 1) { // If statement here might be unneccesary, might remove
    e.target.value = currentValue.charAt(currentValue.length - 1);
  }

  if (e.target.value.length === 1) {
    if (index < inputs.value.length - 1) {
      inputs.value[index + 1].focus();
    }
  }

  setTimeout(() => {
    isInputHandling.value = false;
  }, 0);
};

const handleFocus = (e) => {
  lastFocusedInput.value = e.target;
};

const handleBlur = () => {
  if (!isInputHandling.value) {
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

const inputCount = computed(() => word.value.length); // Make inputCount a computed property so it updates after it receives the word from the API
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
  width: 60px;
  height: 60px;
  text-align: center;
  background-color: transparent;
  border: 2px solid #3a3a3c;
  margin-right: 5px;
  margin-bottom: 10px;
  caret-color: transparent;
  text-transform: uppercase;
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
