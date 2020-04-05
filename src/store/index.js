import Vue from "vue";
import Vuex from "vuex";
import VuexPersistance from "vuex-persist";
import apolloClient from "../apollo";
import router from "../router/index";

const VuexPersist = new VuexPersistance({
  key: "vuex-beer-tasting-game",
  storage: window.localStorage,
});

Vue.use(Vuex);

const game_structure = {
  id: null,
  name: null,
  game_master_name: null,
  started: false,
  finished: false,
  pin_code: null,
  ua: null,
};

const beer_structure = {
  bid: null,
  game_id: null,
  game_type_id: null,
  number: null,
  correct_answer: null,
  question: null,
  name: null,
  type: null,
  description: null,
  image: null,
  brewery_name: null,
  country_name: null,
};

const defaultState = () => {
  return {
    game: game_structure,
    player: {},
    beers: [],
    players: [],
    player_answers: [],
    beer_answers: [],
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
    addPlayer(state, payload) {
      state.players.push(payload);
    },
    setPlayer(state, payload) {
      state.player = payload;
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
    addPlayerAnswers(state, payload) {
      state.player_answers.push(payload);
    },
    resetStore(state) {
      Object.assign(state, defaultState());
    },
  },
  actions: {
    resetStore({ commit }) {
      commit("resetStore");
    },
    async createGame({ commit, dispatch }, payload) {
      commit("resetStore");
      const pin_code = Math.floor(1000 + Math.random() * 9000);

      const game = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/createGame.gql"),
          variables: {
            name: payload.name,
            game_master_name: payload.game_master_name,
            pin_code: pin_code,
          },
        })
        .then((res) => res.data.game.returning[0])
        .catch((error) => {
          if (
            error.graphQLErrors[0].extensions.code === "constraint-violation"
          ) {
            dispatch("createGame", { ...payload });
          }
          console.log(error);
        });

      if (!game) {
        return false;
      }

      commit("setGame", game);

      return true;
    },
    async startGame({ dispatch }) {
      const updatedGame = await dispatch("updateGame", { started: true });

      if (!updatedGame) {
        return false;
      }

      const updatedBeerOrder = await dispatch("updateBeerAnswersOrder");

      if (!updatedBeerOrder) {
        return false;
      }

      return true;
    },
    async updateBeerAnswersOrder({ commit, getters }) {
      const game = getters.getGame;
      const beers = getters.getBeers;
      console.log("beers", beers);

      const beerAnswers = await apolloClient
        .query({
          query: require("../graphql/queries/getBeerAnswers.gql"),
          variables: {
            game_id: game.id,
          },
        })
        .then((res) => res.data.beer_answers)
        .catch((err) => console.log(err));

      if (!beerAnswers) {
        return false;
      }

      console.group(beerAnswers);

      const groupedAnswers = beerAnswers.reduce((acc, answer) => {
        if (!acc[answer.beer_id]) {
          acc[answer.beer_id] = [];
        }

        acc[answer.beer_id].push(answer);

        return acc;
      }, {});

      console.group(groupedAnswers);
      const numberArray = [];
      for (var i = 1; i <= beers.length; i++) {
        numberArray.push(i);
      }
      numberArray.sort(() => Math.random() - 0.5);

      let updatedAnswers = Object.values(groupedAnswers)
        .map((answers) => {
          for (var k = 0; k < answers.length; k++) {
            answers[k].sort_order = numberArray[k];
            delete answers[k].__typename;
          }

          return answers;
        })
        .flat(1);

      console.group(updatedAnswers);

      const updatedBeerAnswers = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/upsertBeerAnswers.gql"),
          variables: {
            objects: updatedAnswers,
          },
        })
        .then((res) => res.data.insert_beer_answers.returning)
        .catch((err) => console.log(err));

      if (!updatedBeerAnswers) {
        return false;
      }

      console.log(updatedBeerAnswers);

      commit("setBeerAnswers", updatedBeerAnswers);

      return true;
    },
    async updateGame({ commit, getters }, payload) {
      const game = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/updateGame.gql"),
          variables: {
            id: getters.getGame.id,
            set: payload,
          },
        })
        .then((res) => res.data.game.returning[0])
        .catch((err) => console.log(err));

      if (!game) {
        return false;
      }

      commit("setGame", { ...game });

      return true;
    },
    async setGameCompleted({ dispatch, getters }) {
      const game = getters.getGame;
      const updateGame = await dispatch("updateGame", { finished: true });

      if (!updateGame) return;

      await dispatch("fetchAndSetEverything", game.id);
    },
    async fetchAndSetEverything({ commit, getters }, payload = null) {
      const game = getters.getGame;
      const gameId = payload === null ? game.id : payload;
      const everything = await apolloClient
        .query({
          query: require("../graphql/queries/getEverything.gql"),
          variables: {
            id: gameId,
          },
        })
        .then((res) => res.data.game)
        .catch((err) => console.log(err));

      if (!everything) return;

      const updatedGame = {
        id: everything.id,
        name: everything.name,
        game_master_name: everything.game_master_name,
        started: everything.started,
        finished: everything.finished,
        game_type_id: everything.game_type_id,
        pin_code: everything.pin_code,
      };
      commit("setGame", updatedGame);
      commit("setPlayers", [...everything.players]);
      commit("setPlayerAnswers", [...everything.player_answers]);
      commit("setBeers", [...everything.beers]);
      commit("setBeerAnswers", [...everything.beer_answers]);

      return true;
    },
    async storeBeers({ commit, getters }, payload) {
      const gameId = getters.getGame.id;

      // Delete the stored beers in case of the game master has chosen then beers but decides to go back and change them
      payload.map((beer) => {
        delete beer.id;
        delete beer.__typename;

        return beer;
      });
      await apolloClient.mutate({
        mutation: require("../graphql/mutations/deleteBeers.gql"),
        variables: {
          game_id: gameId,
        },
      });

      commit("setBeers", []);

      const beers_response = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/storeBeers.gql"),
          variables: {
            objects: payload,
          },
        })
        .then((res) => res.data.beers)
        .catch((err) => console.log(err));

      if (!beers_response || beers_response.returning.length === 0) {
        return false;
      }

      const beers = beers_response.returning;

      commit("setBeers", beers);

      const beer_answers = [];
      beers.forEach((beer) => {
        for (let i = 0; i < beers.length; i++) {
          beer_answers.push({
            game_id: gameId,
            beer_id: beer.id,
            question_content: `${i + 1}`,
          });
        }
      });

      await apolloClient.mutate({
        mutation: require("../graphql/mutations/deleteBeerAnswers.gql"),
        variables: {
          game_id: gameId,
        },
      });

      commit("setBeerAnswers", []);

      const beer_answers_response = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/storeBeerAnswers.gql"),
          variables: {
            objects: beer_answers,
          },
        })
        .then((res) => res.data.beer_answers)
        .catch((err) => console.log(err));

      if (
        !beer_answers_response ||
        beer_answers_response.returning.length === 0
      ) {
        return false;
      }

      commit("setBeerAnswers", beer_answers_response.returning);
    },
    addBeer({ commit, getters }, payload) {
      const beer = { ...beer_structure };

      beer.bid = payload.beer.bid;
      beer.name = payload.beer.beer_name;
      beer.description = payload.beer.beer_description;
      beer.image = payload.beer.beer_label;
      beer.type = payload.beer.beer_style;
      beer.number = getters.getBeers.length + 1;
      beer.brewery_name = payload.brewery.brewery_name;
      beer.country_name = payload.brewery.country_name;

      commit("addBeer", beer);
    },
    removeBeer({ commit, getters }, beerId) {
      const index = getters.getBeers.findIndex((beer) => beer.id === beerId);
      commit("removeBeer", index);
    },
    storePlayers({ commit }, payload) {
      commit("setPlayers", [...payload]);
    },
    async storePlayer({ commit, getters }, name) {
      const game_id = getters.getGame.id;

      const player = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/storePlayer.gql"),
          variables: {
            name,
            game_id,
          },
        })
        .then((res) => res.data.player.returning[0])
        .catch((err) => console.log(err));

      if (!player) {
        return false;
      }

      commit("addPlayer", { ...player });
      commit("setPlayer", { ...player });

      const currentKey = JSON.parse(
        localStorage.getItem("myBeerTastingGameKey")
      );
      if (currentKey !== null && currentKey.game_id !== game_id) {
        localStorage.removeItem("myBeerTastingGameKey");
      }
      localStorage.setItem(
        "myBeerTastingGameKey",
        JSON.stringify({
          game_id,
          player_id: player.id,
        })
      );

      return true;
    },
    removePlayer({ commit, getters }, playerId) {
      const index = getters.getPlayers.findIndex(
        (player) => player.id === playerId
      );
      commit("removePlayer", index);
    },
    async fetchLocalPlayer({ commit }) {
      let currentKey = localStorage.getItem("myBeerTastingGameKey");

      if (currentKey === null || currentKey === undefined) return false;
      currentKey = JSON.parse(currentKey);

      const player_response = await apolloClient
        .query({
          query: require("../graphql/queries/getPlayer.gql"),
          variables: {
            id: currentKey.player_id,
          },
        })
        .then((res) => res.data.player)
        .catch((err) => console.log(err));

      if (!player_response) {
        return false;
      }
      const player = player_response;

      commit("setPlayer", player);

      return player;
    },
    async storePlayerAnswer({ commit, getters, dispatch }, payload) {
      const game = getters.getGame;
      const beers = getters.getBeers;
      let player = getters.getPlayer;

      console.log("game", game);
      console.log("beers", beers);

      if (player === undefined) {
        player = await dispatch("fetchLocalPlayer");
      }
      const answer = {
        game_id: game.id,
        beer_id: payload.current_beer_id,
        player_id: player.id,
        answer: payload.answer,
      };

      const answer_response = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/storePlayerAnswers.gql"),
          variables: {
            objects: answer,
          },
        })
        .then((res) => res.data.player_answers)
        .catch((err) => console.log("error", err));

      if (!answer_response || answer_response.returning.length === 0) {
        return false;
      }

      const response_answer = answer_response.returning[0];
      const answers = getters.getPlayerAnswers;
      const existingIndex = answers.findIndex(
        (answer) => answer.id === response_answer.id
      );

      if (existingIndex >= 0) {
        answers.splice(existingIndex, 1, response_answer);
      } else {
        answers.push(response_answer);
      }

      commit("setPlayerAnswers", answers);

      return true;
    },
    async fetchPlayers({ getters, commit }) {
      const game = getters.getGame;
      let players = getters.getPlayers;

      players = await apolloClient
        .query({
          query: require("../graphql/queries/getPlayers.gql"),
          variables: {
            game_id: game.id,
          },
        })
        .then((res) => res.data.players)
        .catch((err) => console.log("error", err));

      if (!players) return;

      commit("setPlayers", [...players]);

      return true;
    },
    async finalizeGame({ dispatch }) {
      const setEverything = await dispatch("fetchAndSetEverything");

      if (!setEverything) return;

      router.push({ name: "Scoreboard" });
    },
    async setPlayerFinishGame({ getters, dispatch, commit }) {
      const player_answers = getters.getPlayerAnswers;
      const beers = getters.getBeers;
      let player = getters.getPlayer;

      if (player === undefined) {
        player = await dispatch("fetchLocalPlayer");
      }

      const correct_answers = player_answers.filter((player_answer) => {
        return beers.find((beer) => {
          return (
            parseInt(player_answer.answer) === parseInt(beer.correct_answer) &&
            player_answer.player_id === player.id &&
            player_answer.beer_id === beer.id
          );
        });
      });

      const player_response = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/updatePlayer.gql"),
          variables: {
            id: player.id,
            set: { finished: true, score: correct_answers.length * 3 },
          },
        })
        .then((res) => res.data.player)
        .catch((err) => console.log(err));

      if (!player_response) return;

      commit("setPlayer", { ...player, ...player_response.returning[0] });

      const playersFetched = await dispatch("fetchPlayers");

      if (!playersFetched) return;

      return true;
    },
    async storePlayerAnswers({ commit, getters }, payload) {
      const game = getters.getGame;
      let player = getters.getPlayer;

      if (player === undefined) {
        let currentKey = localStorage.getItem("myBeerTastingGameKey");

        if (currentKey === null || currentKey === undefined) return false;
        currentKey = JSON.parse(currentKey);

        const player_response = await apolloClient
          .query({
            query: require("../graphql/queries/getPlayer.gql"),
            variables: {
              id: currentKey.player_id,
            },
          })
          .then((res) => res.data.player)
          .catch((err) => console.log(err));

        if (!player_response) {
          return false;
        }
        player = player_response;
      }

      const answers = [];
      payload.forEach((answer) => {
        answers.push({
          game_id: game.id,
          beer_id: answer.current_beer_id,
          player_id: player.id,
          answer: answer.answer,
        });
      });

      const answer_response = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/storePlayerAnswers.gql"),
          variables: {
            objects: answers,
          },
        })
        .then((res) => res.data.player_answers)
        .catch((err) => console.log(err));

      if (!answer_response || answer_response.returning.length === 0) {
        return false;
      }

      commit("addPlayerAnswers", answer_response.returning);

      const player_response = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/updatePlayer.gql"),
          variables: {
            id: player.id,
            set: { finished: true },
          },
        })
        .then((res) => res.data.player)
        .catch((err) => console.log(err));

      if (!player_response) return;

      commit("setPlayer", { ...player, ...player_response.returning[0] });

      let players = getters.getPlayers;

      if (players.length === 0) {
        players = await apolloClient
          .query({
            query: require("../graphql/queries/getPlayers.gql"),
            variables: {
              game_id: game.id,
            },
          })
          .then((res) => res.data.players)
          .catch((err) => console.log(err));

        if (!players) return;
      }

      players = players.map((player) => {
        if (player.id !== player_response.id) return player;

        return { ...player, ...player_response };
      });

      commit("setPlayers", players);

      return true;
    },
  },
  getters: {
    getGame(state) {
      return state.game;
    },
    getBeers(state) {
      return state.beers;
    },
    getPlayer(state) {
      return state.player;
    },
    getPlayers(state) {
      return state.players;
    },
    getBeerAnswers(state) {
      return state.beer_answers;
    },
    getPlayerAnswers(state) {
      return state.player_answers;
    },
  },
  modules: {},
  plugins: [VuexPersist.plugin],
});
