<template>
  <header class="headerCotainer">
    <div class="headerCotainer__leftSide">
      <div class="headerCotainer__leftSide-number">1</div>
      <div class="headerCotainer__leftSide-title">
        <p>Immediate Steps</p>
        <p>These are your immediate steps to complete</p>
      </div>
    </div>
    <div class="headerCotainer__rightSide">
      <p class="text-gray-500 mb-2 text-lg font-semibold">
        <span class="text-sky-600">{{ completedTasks }}</span> /
        {{ totalTasks }} task left
      </p>
      <ProgressBar :percentage="contentProgress || 0" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProgressBar from "@/components/ProgressBar/ProgressBarIndex.vue";

export default defineComponent({
  name: "HeaderComponent",
  components: { ProgressBar },
  props: {
    completedTasks: {
      type: Number,
      default: 0,
    },
    totalTasks: {
      type: Number,
      default: 0,
    },
    contentProgress: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss"></style>
