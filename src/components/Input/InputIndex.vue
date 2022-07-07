<template>
  <div class="inputContainer">
    <slot name="leftSide"></slot>
    <fa-icon v-if="icon" class="inputContainer__icon" :icon="icon" />
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateInput"
    />
    <slot name="rightSide"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseInput",
  props: {
    id: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  setup(props, { emit }) {
    return {
      updateInput(event: Event) {
        emit("update:modelValue", (event.target as HTMLInputElement).value);
      },
    };
  },
});
</script>

<style lang="scss">
.inputContainer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 2.5rem;
  border-radius: 5px;
  border: 1px solid $borderPrimary;
  padding: 0 1rem;
  position: relative;
  &__icon {
    margin-right: 1rem;
    color: $green-primary;
  }
  input {
    width: 100%;
    color: $green-primary;
    font-size: 1rem;
    border: 0;
    outline: none;
    background-color: transparent;
    &::placeholder {
      color: $text-disabled;
    }
  }
}
</style>
