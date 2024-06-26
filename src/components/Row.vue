<script setup>
import { ref, onMounted, defineProps, defineEmits, watchEffect } from "vue";

const props = defineProps({
  currentRow: Boolean,
});

const emits = defineEmits(["next-row"]);

const inputs = ref([null, null, null, null, null]);

const word = ["h", "e", "l", "l", "o"];
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
  if (!e.key.match(/^[a-zA-Z]$/) && e.key !== "Backspace") {
    e.preventDefault();
    return;
  }

  console.log(e.target.value.length);
  const index = inputs.value.findIndex((input) => input === e.target);
  if (e.target.value.length === 1) {
    if (index === inputs.value.length - 1) {
      checkWord();
      emits("next-row");
    } else {
      inputs.value[index + 1].focus();
    }
  } else {
    inputs.value[index - 1].focus();
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
      :ref="(el) => (inputs[index - 1] = el)"
      :class="letterStates[index - 1]"
      :aria-label="`Letter ${index}`"
    />
  </div>
</template>

<style scoped>
input[type="text"] {
  width: 50px; /* Makes the input square in shape */
  height: 50px;
  text-align: center; /* Centers the text */
  background-color: #3a3a3c;
  border: none;
  margin-right: 5px;
  margin-bottom: 10px;
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
