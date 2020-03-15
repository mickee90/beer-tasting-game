import Vue from "vue";
import Vuex from "vuex";
import VuexPersistance from "vuex-persist";
import axios from "axios";

const VuexPersist = new VuexPersistance({
  key: "vuex-beer-tasting-game",
  storage: window.localStorage
});

Vue.use(Vuex);

const game_structure = {
  id: null,
  name: null,
  game_master_name: null,
  started: false,
  finished: false,
  ua: null,
  created: null
};

// const player_structure = {
//   id: null,
//   game_id: null,
//   name: null,
//   score: null,
//   created: null
// };

// const beer_structure = {
//   id: null,
//   bid: null,
//   game_id: null,
//   game_type_id: null,
//   beer_number: null,
//   correct_answer: null,
//   question: null,
//   name: null,
//   type: null,
//   description: null,
//   image: null,
//   brewery: null,
//   created: null
// };

// const player_answer_structure = {
//   id: null,
//   game_id: null,
//   beer_id: null,
//   answer: null,
//   created: null
// };

// const beer_answer_structure = {
//   id: null,
//   game_id: null,
//   beer_id: null,
//   question_content: ""
// };

export default new Vuex.Store({
  state: {
    game: game_structure,
    beers: [],
    players: [],
    player_answers: [],
    beer_answers: []
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
    async createGame({ commit }, payload) {
      const response = await axios
        .post("https://beer-tasting-game.herokuapp.com/v1/graphql", {
          query: `
            mutation createGames {
              insert_games(objects: {name: "${payload.name}", game_master_name: "${payload.game_master_name}"}) {
                returning {
                  id
                  name
                  game_master_name
                  started
                  finished
                  ua
                  created_at
                }
              }
          }`
        })
        .then(res => res.data)
        .catch(err => console.log(err.data));

      console.log(response);

      if (response["errors"] !== undefined) {
        return false;
      }

      const game = response.data.insert_games.returning[0];

      console.log(game);

      commit("setGame", game);

      return true;
    },
    async updateGame({ commit, getters }, payload) {
      const response = await axios
        .post("https://beer-tasting-game.herokuapp.com/v1/graphql", {
          query: `
          mutation updateGame {
            update_games(where: {id: {_eq: "${
              getters.getGame.id
            }"}}, _set: ${JSON.stringify(payload)}}) {
              returning {
                id
                name
                game_master_name
                finished
                started
                ua
                created_at
              }
            }
          }`
        })
        .then(res => res.data)
        .catch(err => console.log(err.data));

      console.log(response);

      if (response["errors"] !== undefined) {
        return false;
      }

      const game = response.data.insert_games.returning[0];

      console.log(game);

      commit("setGame", ...game);

      return true;
    },
    storeBeers({ commit }, payload) {
      commit("setBeers", { ...payload });
    },
    addBeer({ commit }, payload) {
      commit("addBeer", { ...payload });
    },
    removeBeer({ commit, getters }, beerId) {
      const index = getters.getBeers.findIndex(beer => beer.id === beerId);
      commit("removeBeer", index);
    },
    storeUsers({ commit }, payload) {
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
    getGame(state) {
      return state.game;
    },
    getBeers(state) {
      return state.beers;
    },
    getUsers(state) {
      return state.users;
    }
  },
  modules: {},
  plugins: [VuexPersist.plugin]
});
