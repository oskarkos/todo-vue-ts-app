<template>
  <div
    class="buttonContainer"
    :class="
      buttonType === 'primary'
        ? 'buttonContainer__primary'
        : 'buttonContainer__secondary'
    "
    @click="clickButton"
  >
    <fa-icon v-if="icon" class="buttonContainer__icon" :icon="icon" />
    <p>{{ buttonText }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonIndex",
  emits: ["clickButton"],
  props: {
    buttonText: {
      type: String,
      default: "Button",
    },
    buttonType: {
      type: String,
      default: "primary",
    },
    icon: {
      type: String,
      default: "",
    },
  },
  setup(_, { emit }) {
    const clickButton = () => {
      emit("clickButton");
    };

    return {
      clickButton,
    };
  },
});
</script>

<style lang="scss">
.buttonContainer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 2.5rem;
  cursor: pointer;
  &__icon {
    margin-right: 0.5rem;
  }
  p {
    font-size: 1rem;
    font-weight: bold;
  }

  &__primary {
    border: 2px solid $green-primary;
    background-color: $green-primary;
    color: white;
    &:hover {
      background-color: white;
      border-color: $green-primary;
      color: $green-primary;
    }
  }
  &__secondary {
    border: 2px solid white;
    background-color: white;
    color: $green-primary;

    &:hover {
      background-color: $green-primary;
      border-color: white;
      color: white;
    }
  }
}
</style>
