<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");

* {
  box-sizing: border-box;
}

body {
  font-family: Nunito, Helvetica, Arial, sans-serif;
  margin: 0;
}

#app {
  font-family: Nunito, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
