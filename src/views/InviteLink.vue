<template>
  <div>
    <div v-if="fetchGameError">Somethings wrong with this link...</div>
    <div v-if="loading">Loading...</div>

    <div v-if="game">
      <h1>Welcome to {{ game.name }}</h1>

      <div v-if="game.started">Sorry but the game has already started...</div>
      <div v-else-if="alreadyJoined">
        <div class="mb-5">Your game is already running.</div>
        <router-link :to="{ name: 'JoinGame' }" class="btn btn-blue">Get back to the game</router-link>
      </div>
      <div class="mb-4" v-else>
        <label
          for="playerName"
          class="block text-gray-700 font-bold mb-2"
        >Enter your name to join the game</label>
        <input
          type="text"
          class="shadow appearance-none border rounded mb-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center w-3/4"
          id="playerName"
          v-model="playerName"
          placeholder="Your name"
          required
        />
        <button @click.prevent="onJoinGame" class="btn btn-blue mt-4">Join the game</button>
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
      loading: false,
      fetchGameError: false,
      alreadyJoined: false
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

    const hash = this.$route.query.hash;

    console.log(hash);

    if (!hash) {
      this.loading = false;
      this.fetchGameError = true;
      return;
    }

    const game = await this.$apollo
      .query({
        query: require("../graphql/queries/getGame.gql"),
        variables: {
          id: hash
        }
      })
      .then(res => res.data.game)
      .catch(err => console.log(err));

    this.loading = false;

    if (!game) {
      this.fetchGameError = true;
      return;
    }

    this.game = game;
    this.$store.commit("setGame", { ...game });

    const currentKey = localStorage.getItem("myBeerTastingGameKey");

    if (currentKey !== null && currentKey.game_id !== hash) {
      localStorage.removeItem("myBeerTastingGameKey");
    } else if (currentKey !== null) {
      this.alreadyJoined = true;
    }
  }
};
</script>
