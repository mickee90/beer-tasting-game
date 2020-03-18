<template>
  <div>
    <div v-if="loading">Loading...</div>

    <div v-if="game">
      <h1>Welcome to {{ game.name }}</h1>

      <div class="mb-4" v-if="!game.started">
        <label for="playerName" class="block text-gray-700 font-bold mb-2"
          >Enter your name to join the game</label
        >
        <input
          type="text"
          class="shadow appearance-none border rounded mb-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center w-3/4"
          id="playerName"
          v-model="playerName"
          placeholder="Your name"
          required
        />
        <button @click.prevent="onJoinGame" class="btn btn-blue mt-4">
          Join the game
        </button>
      </div>
      <div v-else>
        Sorry but the game has already started...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      game_id: null,
      game: null,
      playerName: "",
      loading: false
    };
  },
  methods: {
    onJoinGame() {
      const playerName = this.playerName.trim();

      if (playerName === "") {
        alert("Enter your name");
        return;
      }

      const response = this.$store.dispatch("storePlayer", playerName);

      if (!response) return;

      this.$router.push({ name: "JoinGame" });
    }
  },
  async created() {
    this.loading = true;

    const result = await this.$apollo.query({
      query: require("../graphql/queries/getGame.gql"),
      variables: {
        id: this.$store.getters.getGame.id
      }
    });

    this.loading = false;

    if (!result) return;

    this.game = result.data;
  }
  // apollo: {
  //   game: {
  //     query: require("../graphql/queries/getGame.gql"),
  //     variables: {
  //       id: this.$store.getters.getGame.id
  //     }
  //   }
  // }
};
</script>
