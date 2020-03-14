import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game: {
      id: null,
      name: null,
      game_master_name: null,
      started: false,
      finished: false,
      ip: null,
      created: null
    },
    beers: [],
    players: []
  },
  mutations: {
    setGame(state, payload) {
      state.game = payload;
    },
    setBeers(state, payload) {
      state.beers = payload;
    },
    addBeer(state, payload) {
      state.beers.push(payload);
    },
    removeBeer(state, index) {
      state.beers.splice(index, 1);
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    addUser(state, payload) {
      state.users.push(payload);
    },
    removeUser(state, index) {
      state.users.splice(index, 1);
    }
  },
  actions: {
    storeGame({ commit }, payload) {
      const game = { ...payload, created: Date() };
      commit("setGame", game);

      return true;
    },
    updateGame({ commit }, payload) {
      commit("setGame", { ...payload });
    },
    setBeers({ commit }, payload) {
      commit("setBeers", { ...payload });
    },
    addBeer({ commit }, payload) {
      commit("addBeer", { ...payload });
    },
    removeBeer({ commit, getters }, beerId) {
      const index = getters.getBeers.findIndex(beer => beer.id === beerId);
      commit("removeBeer", index);
    },
    setUsers({ commit }, payload) {
      commit("setUsers", { ...payload });
    },
    addUser({ commit }, payload) {
      commit("addUser", { ...payload });
    },
    removeUser({ commit, getters }, userId) {
      const index = getters.getUsers.findIndex(user => user.id === userId);
      commit("removeUser", index);
    }
  },
  getters: {
    getBeers(state) {
      return state.beers;
    },
    getUsers(state) {
      return state.users;
    }
  },
  modules: {}
});
