<template>
  <div class="taksItemListContainer">
    <TaskItem
      v-for="task in tasksSorted"
      :key="task.id"
      :title="task.title"
      :id="task.id"
      :is-completed="task.isCompleted"
      :tags="task.tags"
      :description="task.description"
      @changeTaskState="changeTaskState"
      @editTask="editTask(task)"
      @deleteTask="deleteTask(task.id)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
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
  setup(props, { emit }) {
    const tasksSorted = ref([] as ITasks[]);

    const changeTaskState = (e: Event) => {
      emit("changeTaskState", e);
    };

    const editTask = (e: ITasks) => {
      emit("editTask", e);
    };

    const deleteTask = (e: string) => {
      emit("deleteTask", e);
    };

    watch(
      () => props.tasks,
      (newVal: ITasks[]) => {
        tasksSorted.value = newVal;
        tasksSorted.value = newVal.sort((a, b) => {
          if (a.isCompleted && !b.isCompleted) {
            return 1;
          } else if (!a.isCompleted && b.isCompleted) {
            return -1;
          } else {
            return 0;
          }
        });
      },
      { immediate: true, deep: true }
    );

    return { changeTaskState, tasksSorted, editTask, deleteTask };
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
