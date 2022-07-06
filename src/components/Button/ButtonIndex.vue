<template>
  <div @click="clickButton" class="buttonContainer">
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
  border: 2px solid white;
  border-radius: 5px;
  height: 3rem;
  background-color: white;
  cursor: pointer;
  p {
    font-size: 1rem;
    letter-spacing: 3px;
    font-weight: bold;
    color: $green-primary;
  }
  &:hover {
    background-color: $green-primary;
    border-color: $green-primary;
    p {
      color: white;
    }
  }
}
</style>
