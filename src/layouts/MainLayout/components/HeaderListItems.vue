<template>
  <nav>
    <HeaderItem
      v-for="(item, index) in itemsData"
      :key="index"
      :path="item.path"
      :number="item.number"
      :title="item.title"
    />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderItem from "./HeaderItem.vue";
import { itemsData } from "../data/ItemsData";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    HeaderItem,
  },
  setup() {
    return {
      itemsData,
    };
  },
});
</script>

<style lang="scss">
nav {
  display: flex;
  height: 100%;
  column-gap: 2rem;
}
</style>
