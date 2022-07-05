<template>
  <Header />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header/index.vue";

export default defineComponent({
  components: {
    Header,
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");

#app {
  font-family: Nunito, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
