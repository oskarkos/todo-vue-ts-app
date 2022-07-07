<template>
  <div
    class="tag"
    :class="[
      canDelete ? 'cursorPointer' : undefined,
      !disabled ? 'tag__able' : 'tag__disabled',
    ]"
  >
    <p>{{ tagName }}</p>
    <fa-icon v-if="canDelete" class="icon" icon="close" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TagComponent",
  components: {},
  props: {
    tagName: {
      type: String,
      required: true,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.tag {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  height: 2rem;
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  &__able {
    background-color: $green-primary;
  }
  &__disabled {
    background-color: $text-disabled;
  }
}

.cursorPointer {
  cursor: pointer;
}

.icon {
  margin-left: 1rem;
  color: white;
  font-weight: bold;
}
</style>
