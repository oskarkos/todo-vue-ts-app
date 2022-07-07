<template>
  <teleport to="body">
    <transition name="slide-fade">
      <div v-if="showModal" class="modalBackdrop">
        <div class="modalContainer">
          <div class="modalContainer__main" role="dialog" ref="modal">
            <fa-icon
              class="modalContainer__close"
              icon="close"
              @click="closeModal"
            />
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "ModalCompnent",
  components: {},
  emits: ["closeModal"],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const showModal = ref(false);

    const closeModal = () => {
      emit("closeModal");
      showModal.value = false;
    };

    watch(
      () => props.show,
      (newVal) => {
        showModal.value = newVal;
      }
    );

    return {
      showModal,
      closeModal,
    };
  },
});
</script>

<style lang="scss">
.modalBackdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #00000040;
}
.modalContainer {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  &__main {
    width: 40%;
    background-color: white;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    padding: 2rem;
    position: relative;
  }
  &__close {
    font-size: 1.5rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
}

.slide-fade-enter-active {
  transition: all 200ms ease-out;
}

.slide-fade-leave-active {
  transition: all 200ms ease-in;
}

.slide-fade-leave-to,
.slide-fade-enter-to {
  opacity: 100;
}
.slide-fade-leave-to,
.slide-fade-enter-from {
  opacity: 0;
}
</style>
