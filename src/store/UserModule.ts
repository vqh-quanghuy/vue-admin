import { User } from "@/classes/user";
import { Commit } from "vuex";

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    SET_USER: (state: {user: User}, user: User) => state.user = user
  },
  actions: {
    setUser: ({commit} :{ commit: Commit }, user: User ) => commit('SET_USER', user)
  },
}