import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,
  },
  getters: {},
  mutations: {
    logChange(state) {
      state.loggedIn = !state.loggedIn;
    },
  },
  actions: {
    mockLogin(context) {
      context.commit("logChange");
    },
    mockLogout(context) {
      context.commit("logChange");
    },
  },
  modules: {},
});
