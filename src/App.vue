<!-- <script setup>
import Game from "./components/Game.vue";
import Options from "./components/Options.vue";
</script> -->

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
* {
  color: white;
  font-family: "Libre Franklin", sans-serif;
}
div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;

}
</style>
