<template>
  <div class="homeContainer">
    <header class="headerCotainer">
      <div class="headerCotainer__leftSide">
        <div class="headerCotainer__leftSide-number">1</div>
        <div class="headerCotainer__leftSide-title">
          <p>Immediate Steps</p>
          <p>These are your immediate steps to complete</p>
        </div>
      </div>
      <div class="headerCotainer__rightSide">
        <p class="text-gray-500 mb-2 text-lg font-semibold">
          <span class="text-sky-600">{{ completedTasks }}</span> /
          {{ totalTasks }} task left
        </p>
        <ProgressBar :percentage="contentProgress || 0" />
      </div>
    </header>
    <Divider />
    <section>
      <div class="newTask">
        <div class="newTask__searched">
          <Input
            id="searchedTask"
            icon="magnifying-glass"
            placeholder="Search Task"
            v-model="taskSearched"
          />
        </div>
        <div class="newTask__button">
          <Button
            icon="plus"
            button-text="Add a Task"
            @click-button="openModal"
          ></Button>
        </div>
      </div>
    </section>
    <Divider />
    <section class="taskContainer">
      <div v-if="tasks.length > 0" class="taskContainer__tasks">
        <TasksList
          :tasks="filteredTasks"
          @changeTaskState="changeTaskState"
          @editTask="editTask"
          @deleteTask="deleteTask"
        />
      </div>
      <div v-else class="taskContainer__empty">
        <fa-icon class="taskContainer__empty-icon" icon="list-check" />
        <p>Add a Task to your list</p>
      </div>
    </section>
    <Modal :show="showModal" @closeModal="closeModal">
      <div class="modalContent">
        <h2>Add a New Task</h2>
        <h5>Please, provide all information</h5>
        <div class="modalContent__input">
          <Input
            id="newTaskTitle"
            placeholder="Title"
            v-model="newTask.title"
          />
          <Input
            id="newTaskDescription"
            placeholder="Description"
            v-model="newTask.description"
          />
          <div class="modalContent__tags">
            <Input id="newTags" placeholder="New Tag" v-model="newTag" />
            <Button
              button-type="secondary"
              icon="plus"
              button-text="Add a tag"
              @click-button="addNewTags(newTag)"
            ></Button>
          </div>
          <div v-if="tags.length > 0" class="modalContent__tagsView">
            <Tag
              v-for="(tag, index) in tags"
              :key="index"
              :can-delete="true"
              :tag-name="tag.name"
              @click="deleteTag(tag.id)"
            />
            <span v-if="isMaxTags">You can only add 5 Tags</span>
          </div>
        </div>
        <div class="modalContent__button">
          <Button
            icon="check"
            button-text="Confirm"
            @click-button="addNewTask"
          ></Button>
        </div>
        <span v-if="isNotCompleted" class="modalContent__errorMessage">
          You must complete all the fields
        </span>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { uuid } from "vue-uuid"; // Import uuid
import Divider from "@/components/Divider/DividerIndex.vue";
import Input from "@/components/Input/InputIndex.vue";
import Button from "@/components/Button/ButtonIndex.vue";
import Modal from "@/components/Modal/ModalIndex.vue";
import Tag from "@/components/Tag/TagIndex.vue";
import TasksList from "./components/TasksList.vue";
import ProgressBar from "@/components/ProgressBar/ProgressBarIndex.vue";
import { ITasks, ITags } from "../Home/types/HomeTypes";
import { computed } from "@vue/reactivity";

export default defineComponent({
  name: "HomeView",
  components: { Divider, Input, Button, Modal, Tag, TasksList, ProgressBar },
  setup() {
    const taskSearched = ref("");
    const showModal = ref(false);
    const tasks = ref([] as ITasks[]);
    const newTask = ref({} as ITasks);
    const tags = ref([] as ITags[]);
    const newTag = ref("");
    const isMaxTags = ref(false);
    const isNotCompleted = ref(false);
    const totalTasks = computed(() => tasks.value.length);
    const completedTasks = computed(
      () => tasks.value.filter((task) => task.isCompleted).length
    );
    const contentProgress = computed(() => {
      const total = totalTasks.value;
      const completed = completedTasks.value;
      return (completed / total) * 100;
    });

    const filteredTasks = computed(() => {
      const search = taskSearched.value.toLowerCase();
      return tasks.value.filter((task) => {
        return task.description.toLowerCase().includes(search);
      });
    });

    onMounted(() => {
      tasks.value = localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks")!)
        : [];
    });

    const openModal = () => {
      showModal.value = !showModal.value;
    };

    const closeModal = () => {
      isNotCompleted.value = false;
      showModal.value = false;
      tags.value = [] as ITags[];
      newTag.value = "";
      newTask.value = {} as ITasks;
      newTask.value.title = "";
      newTask.value.description = "";
    };

    const addNewTags = (tag: string) => {
      if (tags.value.length < 5) {
        if (tag.length > 0) {
          const tagId = uuid.v1();
          tags.value.push({
            id: tagId,
            name: tag,
          });
          newTag.value = "";
        } else {
          alert("Please, provide a tag name");
          newTag.value = "";
        }
      } else {
        isMaxTags.value = true;
        newTag.value = "";
      }
    };

    const deleteTask = (taskId: string) => {
      tasks.value = tasks.value.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(tasks.value));
    };

    const editTask = (task: ITasks) => {
      newTask.value.title = task.title;
      newTask.value.description = task.description;
      newTask.value.isCompleted = task.isCompleted;
      newTask.value.id = task.id;
      tags.value = task.tags;
      openModal();
    };

    const changeTaskState = (taskId: string) => {
      const task = tasks.value.find((task) => task.id === taskId);
      if (task) {
        task.isCompleted = !task.isCompleted;
        localStorage.setItem("tasks", JSON.stringify(tasks.value));
      }
    };

    const deleteTag = (tag: string) => {
      isMaxTags.value = false;
      tags.value = tags.value.filter((t) => t.id !== tag);
    };

    const addNewTask = () => {
      if (
        newTask.value.title &&
        newTask.value.description &&
        tags.value.length > 0
      ) {
        if (newTask.value.id) {
          const task = tasks.value.find((task) => task.id === newTask.value.id);
          if (task) {
            task.title = newTask.value.title;
            task.description = newTask.value.description;
            task.tags = tags.value;
          }
        } else {
          tasks.value.push({
            id: uuid.v1(),
            title: newTask.value.title,
            description: newTask.value.description,
            isCompleted: false,
            tags: tags.value,
          });
        }
        localStorage.setItem("tasks", JSON.stringify(tasks.value));
        closeModal();
      } else {
        isNotCompleted.value = true;
      }
    };

    return {
      taskSearched,
      addNewTask,
      showModal,
      closeModal,
      tasks,
      newTask,
      openModal,
      addNewTags,
      newTag,
      tags,
      deleteTag,
      isMaxTags,
      isNotCompleted,
      contentProgress,
      totalTasks,
      completedTasks,
      changeTaskState,
      editTask,
      deleteTask,
      filteredTasks,
    };
  },
});
</script>

<style lang="scss">
.homeContainer {
  background-color: white;
  margin-top: 4rem;
  width: 70%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  padding: 2rem;
}

.headerCotainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  &__leftSide {
    display: flex;
    align-items: center;
    &-title {
      p {
        margin: 0;
        text-align: start;
        color: $title-secondary;
        font-size: 1rem;
      }
      p:first-child {
        color: $title-primary;
        font-size: 1.3rem;
        font-weight: bold;
      }
    }
    &-number {
      font-size: 1.5rem;
      font-weight: bold;
      color: $text-disabled;
      margin-right: 2rem;
    }
  }
  &__rightSide {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 25%;
  }
}

.newTask {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  &__searched {
    width: 20rem;
  }
  &__button {
    width: 250px;
  }
}

.taskContainer {
  padding: 1rem 0;
  display: flex;
  width: 100%;
  &__tasks {
    width: 100%;
  }
  &__empty {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    &:first-child {
      margin-top: 2rem;
    }
    &-icon {
      font-size: 3rem;
      color: $text-disabled;
    }
    p {
      font-size: 1.2rem;
      color: $text-disabled;
      margin-top: 1rem;
    }
  }
}

.modalContent {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  row-gap: 1rem;
  h2 {
    margin: 0;
    color: $title-primary;
  }
  h5 {
    margin: 0;
    color: $title-secondary;
  }
  &__input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 1rem;
  }
  &__tags {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 1rem;
  }
  &__tagsView {
    align-items: center;
    row-gap: 1rem;
    column-gap: 1rem;
    display: flex;
    flex-wrap: wrap;
  }
  &__errorMessage {
    color: $red-primary;
    font-size: 1rem;
  }
}
</style>
