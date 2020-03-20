import Vue from "vue";
import Vuex from "vuex";
import VuexPersistance from "vuex-persist";
import apolloClient from "../apollo";

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

const beer_structure = {
  id: null,
  bid: null,
  game_id: null,
  game_type_id: null,
  beer_number: null,
  correct_answer: null,
  question: null,
  name: null,
  type: null,
  description: null,
  image: null,
  brewery: null,
  created: null
};

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
    setPlayers(state, payload) {
      state.players = payload;
    },
    storePlayer(state, payload) {
      state.players.push(payload);
    },
    removePlayer(state, index) {
      state.players.splice(index, 1);
    }
  },
  actions: {
    async createGame({ commit }, payload) {
      const game = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/createGame.gql"),
          variables: {
            name: payload.name,
            game_master_name: payload.game_master_name
          }
        })
        .then(res => res.data.game.returning[0])
        .catch(err => console.log(err));

      if (!game) {
        return false;
      }

      commit("setGame", game);

      return true;
    },
    async updateGame({ commit, getters }, payload) {
      const game = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/updateGame.gql"),
          variables: {
            id: getters.getGame.id,
            set: payload
          }
        })
        .then(res => res.data.game.returning[0])
        .catch(err => console.log(err));

      if (!game) {
        return false;
      }

      commit("setGame", { ...game });

      return true;
    },
    storeBeers({ commit }, payload) {
      commit("setBeers", { ...payload });
    },
    addBeer({ commit, getters }, payload) {
      const beer = { ...beer_structure };
      console.log(beer, payload);

      beer.bid = payload.beer.bid;
      beer.name = payload.beer.beer_name;
      beer.description = payload.beer.beer_description;
      beer.image = payload.beer.beer_label;
      beer.type = payload.beer.beer_style;
      beer.beer_number = getters.getBeers.length + 1;
      beer.brewery = {
        brewery_id: payload.brewery.brewery_id,
        brewery_name: payload.brewery.brewery_name,
        country_name: payload.brewery.country_name
      };

      commit("addBeer", { ...beer });
    },
    removeBeer({ commit, getters }, beerId) {
      const index = getters.getBeers.findIndex(beer => beer.id === beerId);
      commit("removeBeer", index);
    },
    storePlayers({ commit }, payload) {
      commit("setPlayers", { ...payload });
    },
    async storePlayer({ commit, getters }, name) {
      const game_id = getters.getGame.id;

      const player = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/storePlayer.gql"),
          variables: {
            name,
            game_id
          }
        })
        .then(res => res.data.player.returning[0])
        .catch(err => console.log(err));

      console.log(player);

      if (!player) {
        return false;
      }

      commit("storePlayer", { ...player });
      localStorage.setItem("myBeerTastingGameKey", player.id);

      return true;
    },
    removePlayer({ commit, getters }, playerId) {
      const index = getters.getPlayers.findIndex(
        player => player.id === playerId
      );
      commit("removePlayer", index);
    }
  },
  getters: {
    getGame(state) {
      return state.game;
    },
    getBeers(state) {
      return state.beers;
    },
    getPlayers(state) {
      return state.players;
    }
  },
  modules: {},
  plugins: [VuexPersist.plugin]
});
