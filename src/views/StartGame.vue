<template>
  <div v-if="game !== null">
    <h1>Start the game</h1>
    <div class="mb-8">
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

    <div>
      <BaseButton
        v-if="!game.started && players.length === 0"
        :disabled="disabled"
        >Wait for players</BaseButton
      >

      <BaseButton v-else-if="!game.started" @click="onStartGame"
        >Start the game!</BaseButton
      >

      <BaseButton v-else @click="onGoToGame">
        The game is running. Check the status.</BaseButton
      >
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
    async onStartGame() {
      const response = await this.$store.dispatch("updateGame", {
        started: true
      });

      if (!response) {
        alert("Something went wrong. Try again");
        return;
      }

      this.$router.push({ name: "GameProgress" });
    },
    onGoToGame() {
      this.$router.push({ name: "GameProgress" });
    }
  },
  mounted() {
    this.game = this.$store.getters.getGame;
  },
  created() {
    this.$apollo.subscriptions.gameAndPlayers.refresh();
  },
  apollo: {
    $subscribe: {
      gameAndPlayers: {
        query: require("../graphql/subscriptions/subscribeGameAndPlayers.gql"),
        variables: {
          game_id: store.getters.getGame.id
        },
        result(data) {
          console.log("subscribeGameAndPlayers", data);
          const game = data.data.game;

          this.game = { ...this.game, started: game.started };
          this.players = game.players;
        }
      }
    }
  }
};
</script>
