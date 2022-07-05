<template>
  <div>
    <HeaderListItems />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderListItems from "./components/HeaderListItems.vue";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    HeaderListItems,
  },
});
</script>

<style lang="scss"></style>
