<template>
  <div class="containerApp">
    <div class="containerApp__header">
      <img
        :src="require('@/assets/logos/LogoEmpresa.png')"
        alt="company_logo"
      />
      <HeaderListItems />
      <div @click="closeSesion" class="containerApp__header-close">
        <fa-icon class="containerApp__header-icon" icon="sign-out-alt" />
        <p>Sing Out</p>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import HeaderListItems from "./components/HeaderListItems.vue";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    HeaderListItems,
  },
  setup() {
    const store = useStore();
    const closeSesion = () => {
      store.dispatch("mockLogout");
      window.location.reload();
    };
    return {
      closeSesion,
    };
  },
});
</script>

<style lang="scss">
.containerApp {
  width: 100%;
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: $background-primary;
  &__header {
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: white;
    box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.15);
    img {
      width: 12rem;
      height: 2rem;
    }
    &-close {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 0.5rem;
      color: $title-primary;
      font-weight: bold;
      cursor: pointer;
    }
    &-icon {
      font-size: 1rem;
      color: $green-primary;
    }
  }
}
</style>
