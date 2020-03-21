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

const defaultState = () => {
  return {
    game: game_structure,
    beers: [],
    players: [],
    player_answers: [],
    beer_answers: []
  };
};

const state = defaultState();

export default new Vuex.Store({
  state,
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
    },
    setBeerAnswers(state, payload) {
      state.beer_answers = payload;
    },
    setPlayerAnswers(state, payload) {
      state.player_answers = payload;
    },
    resetStore(state) {
      Object.assign(state, defaultState());
    }
  },
  actions: {
    async createGame({ commit }, payload) {
      commit("resetStore");

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
    async setGameCompleted({ dispatch, getters }) {
      const game = getters.getGame;
      // let beers = getters.getBeers;
      // let playerAnswers = getters.getPlayerAnswers;
      // console.log(game, beers, playerAnswers);
      const updateGame = await dispatch("updateGame", { finished: true });

      if (!updateGame) return;

      // if (beers.length === 0 || playerAnswers.length === 0) {
      await dispatch("fetchAndSetEverything", game.id);
      // }

      // const players = [];
      // commit("setPlayers", players);
    },
    async fetchAndSetEverything({ commit, getters }, payload = null) {
      const game = getters.getGame;
      const gameId = payload === null ? game.id : payload;
      const everything = await apolloClient
        .query({
          query: require("../graphql/queries/getEverything.gql"),
          variables: {
            id: gameId
          }
        })
        .then(res => res.data.game)
        .catch(err => console.log(err));

      if (!everything) return;

      const players = await everything.players.map(player => {
        const playerAnswers = everything.player_answers.filter(
          playerAnswer => (playerAnswer.id = player.id)
        );

        if (playerAnswers.length === 0) return;

        const correct_answers = everything.beers.filter(beer => {
          return playerAnswers.find(answer => {
            return (
              parseInt(answer.answer) === parseInt(beer.correct_answer) &&
              answer.player_id === player.id
            );
          });
        });
        return { ...player, score: correct_answers.length * 3 };
      });

      commit("setPlayers", [...players]);
      commit("setPlayerAnswers", { ...everything.player_answers });
      commit("setBeers", { ...everything.beers });
      commit("setBeerAnswers", { ...everything.beer_answers });
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
    },
    getBeerAnswers(state) {
      return state.beer_answers;
    },
    getPlayerAnswers(state) {
      return state.player_answers;
    }
  },
  modules: {},
  plugins: [VuexPersist.plugin]
});
