<template>
  <router-link :to="path">
    <div class="numberCicle">
      <p>{{ number }}</p>
    </div>
    <p class="title">{{ title }}</p>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "HeaderComponent",
  props: {
    path: {
      type: String,
      default: "/",
    },
    number: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss">
a {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: $title-secondary;
  padding: 0 0.5rem;
  text-decoration: none;
  font-weight: bold;

  .numberCicle {
    display: flex;
    justify-content: center;
    width: 1.4rem;
    height: 1.4rem;
    border: 2px solid $icon-primary;
    border-radius: 99%;
    & p {
      margin: 0;
      color: $icon-primary;
      font-size: smaller;
      font-weight: bold;
    }
  }

  .title {
    margin-left: 0.5rem;
  }

  &.router-link-exact-active {
    color: $title-primary;
    box-shadow: inset 0 -3px 0 $green-primary;
    .numberCicle {
      border-color: $green-primary;
      background-color: $green-primary;
      p {
        color: white;
      }
    }
  }
}
</style>
