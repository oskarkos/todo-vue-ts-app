import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import UUID from "vue-uuid";
import "./styles/main.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSignOutAlt,
  faMagnifyingGlass,
  faPlus,
  faClose,
  faListCheck,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import {
  faCircleCheck,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

library.add(
  faSignOutAlt,
  faMagnifyingGlass,
  faPlus,
  faClose,
  faListCheck,
  faCheck,
  faCircleCheck,
  faTrashCan,
  faPenToSquare
);

const app = createApp(App);

app.component("fa-icon", FontAwesomeIcon);
app.use(UUID);
app.use(store);
app.use(router);
app.mount("#app");
