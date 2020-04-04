<template>
  <div>
    <h1>The beer tasting game!</h1>
    <div v-if="backdoor" class="mb-10 flex">
      <div class="flex-1 m-auto">
        <router-link :to="{ name: 'Create' }" class="btn btn-blue"
          >Start a new game</router-link
        >
      </div>
      <div class="flex-1 border-l-2 p-4">
        <div v-if="fetchGameError !== ''" class="font-bold mb-2 text-red-700">
          {{ fetchGameError }}
        </div>
        <BaseInputText
          placeholder="Enter pin code"
          classes="w-3/4 text-center"
          v-model="pinCode"
        />

        <BaseButton @click="findGame" :disabled="false" classes="mt-5">
          Find Game</BaseButton
        >
      </div>
    </div>
    <div v-else>
      <h3>This site will hopefully be ready soon...</h3>
    </div>
    <img src="/img/beer.jpg" alt />
    <div>
      How do we play?
      <br />
      <br />

      <ul class="list-disc">
        <li class="mb-2">Pick one game master who buys X numbers of beers.</li>
        <li class="mb-2">
          The game master creates a game by entering the name, the beers and
          game type.
        </li>
        <li class="mb-2">
          The players can then enter the pin code, scan a QR-code or the game
          master sends out the link for them to join the game.
        </li>
        <li class="mb-2">
          The players join the game and the beer tasting can begin!
        </li>
        <li class="mb-2">
          When all the beers have been tasted and the results submitted, the
          game is over and the players will end up on a scoreboard
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backdoor: false,
      pinCode: "",
      fullPinCode: false,
      fetchGameError: "",
    };
  },
  methods: {
    async findGame() {
      if (this.pinCode.length === 0) {
        this.fetchGameError = "Enter pin code";
        return;
      }

      if (this.pinCode.length !== 4) {
        this.fetchGameError = "4 digits required";
        return;
      }

      const game = await this.$apollo
        .query({
          query: require("../graphql/queries/searchGame.gql"),
          variables: {
            pinCode: this.pinCode,
          },
        })
        .then((res) => res.data.games[0])
        .catch((err) => console.log(err));

      if (!game) {
        this.fetchGameError = "No game found";
        return;
      }

      const gameUrl =
        process.env.VUE_APP_HOST_NAME +
        this.$router.resolve({
          name: "InviteLink",
        }).href +
        `?hash=${game.id}`;

      window.location.href = gameUrl;
    },
    resetError() {
      this.fetchgameError == "";
    },
  },
  created() {
    if ("backdoor" in this.$route.query) {
      this.backdoor = true;
    }
  },
};
</script>
