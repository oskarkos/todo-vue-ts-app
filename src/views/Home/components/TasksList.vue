<template>
  <div class="taksItemListContainer">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :title="task.title"
      :id="task.id"
      :is-completed="task.isCompleted"
      :tags="task.tags"
      :description="task.description"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TaskItem from "../components/TasksItem.vue";
import { ITasks } from "../types/HomeTypes";

export default defineComponent({
  name: "TaskListsComponent",
  components: {
    TaskItem,
  },
  props: {
    tasks: {
      type: Array as PropType<Array<ITasks>>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.taksItemListContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
</style>
