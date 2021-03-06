<template>
  <div class="homeContainer">
    <HeaderCompVue
      :completed-tasks="completedTasks"
      :total-tasks="totalTasks"
      :content-progress="contentProgress"
    />
    <Divider />
    <section>
      <div class="newTask">
        <div class="newTask__searched">
          <Input
            id="searchedTask"
            icon="magnifying-glass"
            placeholder="Search a Task"
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
    <section class="py-8">
      <div class="flex flex-col justify-center items-start">
        <Input
          id="searchedTag"
          icon="tags"
          placeholder="Search a Tag"
          v-model="tagSearched"
        >
          <template #leftSide>
            <div class="flex gap-2 pr-4">
              <Tag
                v-for="(tag, index) in tagsSearched"
                :key="index"
                :can-delete="true"
                :tag-name="tag"
                @click="deleteSearchedTag(tag)"
              ></Tag>
            </div>
          </template>
          <template #rightSide>
            <div class="fles justify-end w-28 absolute right-0">
              <Button
                icon="magnifying-glass"
                button-text="search"
                @click-button="addSearchTag"
              ></Button>
            </div>
          </template>
        </Input>
        <p v-if="tagsSearched.length === 5" class="text-red-500">
          You can only search maximum 5 tags
        </p>
      </div>
    </section>
    <Divider />
    <section class="taskContainer">
      <div v-if="filteredTasks.length > 0" class="taskContainer__tasks">
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
import { uuid } from "vue-uuid";
import Divider from "@/components/Divider/DividerIndex.vue";
import Input from "@/components/Input/InputIndex.vue";
import Button from "@/components/Button/ButtonIndex.vue";
import Modal from "@/components/Modal/ModalIndex.vue";
import Tag from "@/components/Tag/TagIndex.vue";
import TasksList from "./components/TasksList.vue";
import HeaderCompVue from "./components/HeaderComp.vue";
import { ITasks, ITags } from "../Home/types/HomeTypes";
import { computed } from "@vue/reactivity";

export default defineComponent({
  name: "HomeView",
  components: {
    Divider,
    Input,
    Button,
    Modal,
    Tag,
    TasksList,
    HeaderCompVue,
  },
  setup() {
    const taskSearched = ref("");
    const tagSearched = ref("");
    const showModal = ref(false);
    const tasks = ref([] as ITasks[]);
    const newTask = ref({} as ITasks);
    const tags = ref([] as ITags[]);
    const tagsSearched = ref([] as string[]);
    const newTag = ref("");
    const isMaxTags = ref(false);
    const isNotCompleted = ref(false);
    const allTasks = ref([] as ITasks[]);
    const totalTasks = computed(() => allTasks.value.length);
    const completedTasks = computed(
      () => allTasks.value.filter((task) => task.isCompleted).length
    );
    const contentProgress = computed(() => {
      const total = totalTasks.value;
      const completed = completedTasks.value;
      return (completed / total) * 100;
    });

    const filteredTasks = computed({
      get: () => {
        return tasks.value.filter((task) => {
          const search = taskSearched.value.toLowerCase();
          return task.description.toLowerCase().includes(search);
        });
      },
      set: (value) => {
        tasks.value = value;
      },
    });

    const getAllTask = () => {
      allTasks.value = JSON.parse(
        localStorage.getItem("tasks") || "[]"
      ) as ITasks[];
    };

    onMounted(() => {
      tasks.value = JSON.parse(
        localStorage.getItem("tasks") || "[]"
      ) as ITasks[];
      getAllTask();
    });

    const addSearchTag = () => {
      if (!tagSearched.value) return;
      if (tagsSearched.value.length === 5) return;
      let completedTask: ITasks[] = JSON.parse(
        localStorage.getItem("tasks") || "[]"
      ) as ITasks[];
      tagsSearched.value.push(tagSearched.value);
      for (let i = 0; i < tagsSearched.value.length; i++) {
        completedTask = completedTask.filter((task) => {
          return task.tags
            .map((tag) => tag.name.trim())
            .includes(tagsSearched.value[i]);
        });
      }
      filteredTasks.value = completedTask;
      tagSearched.value = "";
    };

    const deleteSearchedTag = (tag: string) => {
      tagsSearched.value = tagsSearched.value.filter((tagSearched) => {
        return tagSearched !== tag;
      });
      let completedTask: ITasks[] = JSON.parse(
        localStorage.getItem("tasks") || "[]"
      ) as ITasks[];
      for (let i = 0; i < tagsSearched.value.length; i++) {
        completedTask = completedTask.filter((task) => {
          return task.tags
            .map((tag) => tag.name.trim())
            .includes(tagsSearched.value[i]);
        });
      }
      filteredTasks.value = completedTask;
    };

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
      getAllTask();
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
      const task = filteredTasks.value.find((task) => task.id === taskId);
      const taskFullItem = allTasks.value.find((task) => task.id === taskId);
      if (task && taskFullItem) {
        task.isCompleted = !task.isCompleted;
        taskFullItem.isCompleted = !taskFullItem.isCompleted;
        localStorage.setItem("tasks", JSON.stringify(allTasks.value));
        getAllTask();
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
        getAllTask();
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
      addSearchTag,
      tagSearched,
      tagsSearched,
      deleteSearchedTag,
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
