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
  ua: null
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
  country_name: null
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
    async storeBeers({ commit, getters }, payload) {
      console.log(payload);
      const gameId = getters.getGame.id;

      // Delete the stored beers in case of the game master has chosen then beers but decides to go back and change them
      payload.map(beer => {
        delete beer.id;
        delete beer.__typename;

        return beer;
      });
      await apolloClient.mutate({
        mutation: require("../graphql/mutations/deleteBeers.gql"),
        variables: {
          game_id: gameId
        }
      });

      commit("setBeers", []);

      const beers_response = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/storeBeers.gql"),
          variables: {
            objects: payload
          }
        })
        .then(res => res.data.beers)
        .catch(err => console.log(err));

      if (!beers_response || beers_response.returning.length === 0) {
        return false;
      }

      const beers = beers_response.returning;

      commit("setBeers", beers);

      const beer_answers = [];
      beers.forEach(beer => {
        for (let i = 0; i < beers.length; i++) {
          beer_answers.push({
            game_id: gameId,
            beer_id: beer.id,
            question_content: `${i + 1}`
          });
        }
      });

      await apolloClient.mutate({
        mutation: require("../graphql/mutations/deleteBeerAnswers.gql"),
        variables: {
          game_id: gameId
        }
      });

      commit("setBeerAnswers", []);

      const beer_answers_response = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/storeBeerAnswers.gql"),
          variables: {
            objects: beer_answers
          }
        })
        .then(res => res.data.beer_answers)
        .catch(err => console.log(err));

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
      // console.log(beer, payload);

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

      commit("addPlayer", { ...player });
      commit("setPlayer", { ...player });

      const currentKey = localStorage.getItem("myBeerTastingGameKey");
      if (currentKey !== null && currentKey.game_id !== game_id) {
        localStorage.removeItem("myBeerTastingGameKey");
      }
      localStorage.setItem("myBeerTastingGameKey", {
        game_id,
        player_id: player.id
      });

      return true;
    },
    removePlayer({ commit, getters }, playerId) {
      const index = getters.getPlayers.findIndex(
        player => player.id === playerId
      );
      commit("removePlayer", index);
    },
    async storePlayerAnswers({ commit, getters }, payload) {
      const game = getters.getGame;
      let player = getters.getPlayer;
      console.log("player", player);

      if (player === undefined) {
        let currentKey = localStorage.getItem("myBeerTastingGameKey");

        if (currentKey === null || currentKey === undefined) return false;
        currentKey = JSON.parse(currentKey);

        const player_response = await apolloClient
          .query({
            query: require("../graphql/queries/getPlayer.gql"),
            variables: {
              id: currentKey.player_id
            }
          })
          .then(res => res.data.player)
          .catch(err => console.log(err));

        console.log("currentKey 3", player_response);
        if (!player_response) {
          return false;
        }
        player = player_response;
      }

      const answers = [];
      payload.forEach(answer => {
        answers.push({
          game_id: game.id,
          beer_id: answer.current_beer_id,
          player_id: player.id,
          answer: answer.answer
        });
      });

      const answer_response = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/storePlayerAnswers.gql"),
          variables: {
            objects: answers
          }
        })
        .then(res => res.data.player_answers)
        .catch(err => console.log(err));

      if (!answer_response || answer_response.returning.length === 0) {
        return false;
      }

      commit("addPlayerAnswers", answer_response.returning);

      const player_response = await apolloClient
        .mutate({
          mutation: require("../graphql/mutations/updatePlayer.gql"),
          variables: {
            id: player.id,
            set: { finished: true }
          }
        })
        .then(res => res.data.player)
        .catch(err => console.log(err));

      if (!player_response) return;

      commit("setPlayer", { ...player, ...player_response.returning[0] });

      let players = getters.getPlayers;

      if (players.length === 0) {
        players = await apolloClient
          .query({
            query: require("../graphql/queries/getPlayers.gql"),
            variables: {
              game_id: game.id
            }
          })
          .then(res => res.data.players)
          .catch(err => console.log(err));

        if (!players) return;
      }

      players = players.map(player => {
        if (player.id !== player_response.id) return player;

        return { ...player, ...player_response };
      });

      commit("setPlayers", players);

      return true;
    }
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
    }
  },
  modules: {},
  plugins: [VuexPersist.plugin]
});
