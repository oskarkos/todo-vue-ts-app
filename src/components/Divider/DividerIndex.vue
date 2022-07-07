<template>
  <div class="divider"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DividerComponent",
});
</script>

<style lang="scss">
.divider {
  width: 100%;
  height: 1px;
  background-color: $borderPrimary;
}
</style>
