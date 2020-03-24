<template>
  <div>
    <h1>Waiting for the results</h1>
    <div class="mb-8">
      <p>Waiting for the game master to collect the answers.</p>
      <p>Let's have another beer while waiting..</p>
    </div>
  </div>
</template>

<script>
import store from "../store/index";

export default {
  data() {
    return {
      game: null
    };
  },
  created() {
    this.game = this.$store.getters.getGame;
  },
  apollo: {
    $subscribe: {
      game: {
        query: require("../graphql/subscriptions/subscribeGame.gql"),
        variables: {
          id: store.getters.getGame.id
        },
        result(data) {
          const game = data.data.game;
          this.game = { ...this.game, ...game };
          if (this.game.finished) {
            this.$router.push({ name: "Scoreboard" });
          }
        }
      }
    }
  }
};
</script>