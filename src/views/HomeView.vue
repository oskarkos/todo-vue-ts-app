<template>
  <div class="taskContainer">
    <header>
      <div>1</div>
      <div>
        <p>Immediate Steps</p>
        <p>These are your immediate steps to complete</p>
      </div>
      <div>Progress Bar</div>
    </header>
    <Divider />
    <section>
      <div>
        <p>buscado1</p>
        <p>tags</p>
      </div>
      <div></div>
    </section>
    <Divider />
    <section>Task</section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Divider from "@/components/Divider/DividerIndex.vue";

export default defineComponent({
  name: "HomeView",
  components: { Divider },
});
</script>

<style lang="scss">
.taskContainer {
  margin-top: 4rem;
  width: 70%;
  height: 200rem;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  padding: 2rem;
}
</style>
