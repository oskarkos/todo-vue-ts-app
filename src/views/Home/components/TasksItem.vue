<template>
  <div>
    <div class="taskItemContainer">
      <div class="taskItemContainer__leftSide">
        <fa-icon
          v-if="!isCompleted"
          class="taskItemIcon taskItemIcon__select"
          icon="fa-regular fa-circle-check"
          @click="changeTaskState"
        />
        <fa-icon
          v-if="isCompleted"
          class="taskItemIcon taskItemIcon__completed"
          icon="fa-solid fa-circle-check"
          @click="changeTaskState"
        />
        <div class="taskItemContainer__leftSide-description">
          <h4
            class="m-0 text-xl font-semibold"
            :class="isCompleted ? 'text-gray-200' : 'text-neutral-800'"
          >
            {{ title }}
          </h4>
          <p
            class="m-0 text-base"
            :class="isCompleted ? 'text-gray-200' : 'text-neutral-500'"
          >
            {{ description }}
          </p>
        </div>
      </div>
      <div class="taskItemContainer__rigthSide">
        <div class="taskItemContainer__rigthSide-tags">
          <Tag
            v-for="(tag, index) in tags"
            :key="index"
            :tag-name="tag.name"
            :disabled="isCompleted"
          />
        </div>
        <div class="taskItemContainer__rigthSide-actions">
          <fa-icon
            class="taskItemIcon"
            :class="
              isCompleted
                ? 'taskItemIcon__completed cursor-not-allowed'
                : undefined
            "
            icon="fa-regular fa-pen-to-square"
            @click="editTask"
          />
          <fa-icon
            class="taskItemIcon"
            :class="
              isCompleted
                ? 'taskItemIcon__completed cursor-not-allowed'
                : undefined
            "
            icon="fa-regular fa-trash-can"
            @click="deleteTask"
          />
        </div>
      </div>
    </div>
    <Divider />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ITags } from "../types/HomeTypes";
import Tag from "@/components/Tag/TagIndex.vue";
import Divider from "@/components/Divider/DividerIndex.vue";

export default defineComponent({
  name: "TaskItemComponent",
  components: { Tag, Divider },
  props: {
    isCompleted: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    tags: {
      type: Array as PropType<Array<ITags>>,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const changeTaskState = () => {
      emit("changeTaskState", props.id);
    };

    const editTask = () => {
      if (props.isCompleted) return;
      emit("editTask");
    };

    const deleteTask = () => {
      if (props.isCompleted) return;
      emit("deleteTask");
    };
    return { changeTaskState, editTask, deleteTask };
  },
});
</script>

<style lang="scss">
.taskItemContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;
  &__leftSide {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    &-description {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }
  }
  &__rigthSide {
    display: flex;
    align-items: center;
    column-gap: 3rem;
    &-tags {
      display: flex;
      align-items: flex-start;
      column-gap: 1rem;
      flex-wrap: wrap;
      row-gap: 1rem;
    }
    &-actions {
      display: flex;
      justify-content: center;
      column-gap: 0.5rem;
    }
  }
}

.taskItemIcon {
  font-size: 1.5rem;
  color: $green-primary;
  cursor: pointer;
  &__select {
    color: $text-disabled;
  }
  &__completed {
    color: $text-disabled;
  }
}
</style>
