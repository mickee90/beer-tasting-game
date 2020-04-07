<template>
  <div v-if="!loading">
    <h1>Start the game</h1>
    <div class="mb-8">
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

    <div>
      <BaseButton
        v-if="!gameAndPlayers.started && gameAndPlayers.players.length === 0"
        :disabled="true"
        >Wait for players</BaseButton
      >

      <BaseButton v-else-if="!gameAndPlayers.started" @click="onStartGame"
        >Start the game!</BaseButton
      >

      <BaseButton v-else @click="onGoToGame"
        >The game is running. Check the status.</BaseButton
      >
    </div>

    <div class="mt-10 flex">
      <div class="flex-1 m-auto">
        <div
          class="border-2 border-gray-400 inline-block px-4 py-2 rounded-full"
        >
          {{ gameAndPlayers.pin_code }}
        </div>
      </div>
      <div class="flex-1 border-l-2 p-4">
        <VueQrcode
          :value="gameUrl"
          :options="{ width: 80 }"
          class="mx-auto"
        ></VueQrcode>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index";
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  data() {
    return {
      gameAndPlayers: null,
      loading: 0,
      gameUrl: null,
    };
  },
  methods: {
    async onStartGame() {
      const response = await this.$store.dispatch("startGame");

      if (!response) {
        alert("Something went wrong. Try again");
        return;
      }

      this.$router.push({ name: "GameProgress" });
    },
    onGoToGame() {
      this.$router.push({ name: "GameProgress" });
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
  created() {
    this.gameUrl =
      process.env.VUE_APP_HOST_NAME +
      this.$router.resolve({
        name: "InviteLink",
      }).href +
      `?hash=${this.game.id}`;
  },
  components: { VueQrcode },
};
</script>
