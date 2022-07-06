<template>
  <div class="container">
    <div class="container_header">
      <img
        :src="require('@/assets/logos/LogoEmpresa.png')"
        alt="company_logo"
      />
      <HeaderListItems />
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderListItems from "./components/HeaderListItems.vue";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    HeaderListItems,
  },
});
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &_header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    img {
      width: 12rem;
      height: 2rem;
    }
  }
}
</style>
