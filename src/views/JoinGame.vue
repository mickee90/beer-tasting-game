<template>
  <div v-if="!loading" class="px-8">
    <div v-if="gameAndPlayers.finished === true">
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
          v-for="(player, index) in gameAndPlayers.players"
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

      <BaseButton @click="onStartGame" :disabled="!gameAndPlayers.started">{{
        !gameAndPlayers.started ? "Waiting..." : "Bring out the beer!"
      }}</BaseButton>
    </div>
  </div>
</template>

<script>
import store from "../store/index";
export default {
  data() {
    return {
      gameAndPlayers: null,
      loading: 0,
    };
  },
  methods: {
    onStartGame() {
      this.$router.push({ name: "GameRunning" });
    },
  },
  apollo: {
    gameAndPlayers: {
      query: require("../graphql/queries/getGameAndPlayers.gql"),
      variables() {
        return {
          id: store.getters.getGame.id,
        };
      },
      update(data) {
        return { ...data.game };
      },
      subscribeToMore: [
        {
          document: require("../graphql/subscriptions/subscribeGameAndPlayers.gql"),
          variables() {
            return {
              game_id: store.getters.getGame.id,
            };
          },
          updateQuery: (previous, { subscriptionData }) => {
            return { ...subscriptionData.data };
          },
        },
      ],
    },
  },
};
</script>
