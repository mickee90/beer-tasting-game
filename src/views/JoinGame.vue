<template>
  <div v-if="game">
    <div v-if="game.finished">
      <h1>The game has ended</h1>
      <router-link :to="{ name: 'Scoreboard' }" class="btn btn-blue"
        >Go to scoreboard</router-link
      >
    </div>
    <div v-else>
      <h1>Waiting for the game to start</h1>
      <div class="mb-8 mt-2">
        <div
          class="border-b border-gray-300 mb-4 pb-4"
          v-for="(player, index) in players"
          :key="player.id"
        >
          <div class="text-xl">
            <div class="card-header">
              Player #{{ index + 1 }} - {{ player.name }}
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        You can continue as soon as everyone has joined and the game master has
        started the game
      </div>

      <button v-if="!game.started" class="btn btn-blue" disabled>
        Waiting...
      </button>
      <button v-else class="btn btn-blue" @click="onStartGame">
        Bring out the beer!
      </button>
    </div>
  </div>
</template>

<script>
import store from "../store/index";
export default {
  data() {
    return {
      players: [],
      game: null
    };
  },
  methods: {
    onStartGame() {
      this.$router.push({ name: "GameRunning" });
    }
  },
  created() {
    this.game = this.$store.getters.getGame;
    console.log(this.game);
  },
  apollo: {
    $subscribe: {
      gameAndPlayers: {
        query: require("../graphql/subscriptions/subscribeGameAndPlayers.gql"),
        variables: {
          game_id: store.getters.getGame.id
        },
        result(data) {
          const game = data.data.game;

          this.game = { ...this.game, ...game };
          this.players = game.players;
        }
      }
    }
  }
};
</script>
