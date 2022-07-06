import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faSignOutAlt);

const app = createApp(App);

app.component("fa-icon", FontAwesomeIcon);

app.use(store);
app.use(router);
app.mount("#app");
