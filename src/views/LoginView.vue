<template>
  <div class="login">
    <div class="login__card">
      <div class="login__card-leftSide">
        <h1>LOGIN</h1>
        <div class="login__input">
          <label for="user">User</label>
          <div
            class="login__input-container"
            :class="
              hasError
                ? 'login__input-containerError'
                : 'login__input-containerNormal'
            "
          >
            <input type="text" name="user" v-model="user" />
          </div>
        </div>
        <div class="login__input">
          <label for="pass">Password</label>
          <div
            class="login__input-container"
            :class="
              hasError
                ? 'login__input-containerError'
                : 'login__input-containerNormal'
            "
          >
            <input type="password" name="pass" v-model="pass" />
          </div>
        </div>
        <div class="login__button">
          <Button @click-button="login" button-text="Login"></Button>
        </div>
        <p class="login__errorMessage" v-if="emptyData">Fields Required</p>
        <p class="login__errorMessage" v-if="incorrectData">
          User or Password incorrect
        </p>
      </div>
      <div class="login__card-rightSide">
        <img :src="require('@/assets/logos/lock-cloud.svg')" alt="lock" />
        <a target="_blank" href="http://athmos.co/">Athmos</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Button from "@/components/Button/ButtonIndex.vue";
import { computed } from "@vue/reactivity";

export default defineComponent({
  name: "LoginView",
  components: { Button },
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = ref("");
    const pass = ref("");
    const incorrectData = ref(false);
    const emptyData = ref(false);

    const hasError = computed(() => emptyData.value || incorrectData.value);

    const existLoginData = () => {
      if (user.value && pass.value) {
        emptyData.value = false;
        return true;
      } else {
        incorrectData.value = false;
        emptyData.value = true;
        return false;
      }
    };

    const login = () => {
      if (!existLoginData()) return;
      if (user.value === "admin" && pass.value === "admin") {
        incorrectData.value = false;
        store.dispatch("mockLogin");
        router.push("/");
      } else {
        incorrectData.value = true;
      }
    };

    return {
      user,
      pass,
      login,
      incorrectData,
      emptyData,
      hasError,
    };
  },
});
</script>

<style lang="scss">
.login {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgb(4, 201, 157);
  background: linear-gradient(
    90deg,
    rgba(4, 201, 157, 0.8677494199535962) 6%,
    rgba(177, 190, 202, 0.7703016241299304) 98%
  );
  &__card {
    width: 70%;
    display: flex;
    height: calc(100vh - 30%);
    border: 2px solid $background-primary;
    border-radius: 1rem;
    background-color: #ffffff45;
    &-leftSide {
      width: 60%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h1 {
        color: white;
        letter-spacing: 3px;
      }
    }
    &-rightSide {
      border-radius: 0.9rem;
      background-color: $background-primary;
      box-shadow: -11px 0px 21px -1px rgba(0, 0, 0, 0.19);
      width: 40%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        width: 60%;
      }
      a {
        position: absolute;
        outline: none;
        bottom: 1rem;
        color: $green-primary;
      }
    }
  }
  &__button {
    width: 250px;
  }
  &__errorMessage {
    text-align: start;
    width: 250px;
    color: $red-primary;
    font-size: 0.8rem;
    font-weight: bold;
    margin-top: 1rem;
  }
  &__input {
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    label {
      color: $background-primary;
      font-size: 1rem;
      letter-spacing: 2px;
      font-weight: bold;
    }
    &-containerError {
      border: 2px solid $red-primary;
    }
    &-containerNormal {
      border: 2px solid $background-primary;
    }
    &-container {
      width: 100%;
      height: 2.4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: none;
      border-radius: 0.8rem;
      margin-bottom: 1rem;
      padding: 0.3rem 0.5rem 0.3rem 0.5rem;
      input {
        color: white;
        width: 100%;
        outline: none;
        background: none;
        border: 0;
        font-size: medium;
      }
    }
  }
}
</style>
