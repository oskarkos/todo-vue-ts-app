<template>
  <div>
    <p>404 not Found</p>
    <router-link to="/">
      <p>Go to Home</p>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NoFound",
  components: {},
  props: {},
  setup: (props) => {
    return {};
  },
});
</script>
