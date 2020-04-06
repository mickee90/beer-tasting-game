<template>
  <div>
    <div v-if="fetchGameError">Somethings wrong with this link...</div>
    <!-- <div v-if="loading === true">Loading...</div> -->

    <div v-if="game">
      <h1>Welcome to {{ game.name }}</h1>

      <div v-if="game.started === true">
        Sorry but the game has already started...
      </div>
      <div v-else-if="alreadyJoined === true">
        <div class="mb-5">Your game is already running.</div>
        <router-link :to="{ name: 'JoinGame' }" class="btn btn-blue"
          >Get back to the game</router-link
        >
      </div>
      <div class="mb-4" v-else>
        <label for="playerName" class="block text-gray-700 font-bold mb-2"
          >Enter your name to join the game</label
        >
        <BaseInputText
          type="text"
          classes="text-center w-3/4"
          id="playerName"
          v-model="playerName"
          placeholder="Your name"
          required
        />
        <BaseButton @click="onJoinGame" :disabled="disabled" classes="mt-4"
          >Join the game</BaseButton
        >
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
      alreadyJoined: false,
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
    },
  },
  computed: {
    disabled() {
      return this.playerName.trim() === "";
    },
  },
  async created() {
    this.loading = true;
    this.$store.dispatch("resetStore");

    const hash = this.$route.query.hash;

    if (!hash) {
      this.loading = false;
      this.fetchGameError = true;
      return;
    }

    const fetchEverything = this.$store.dispatch("fetchAndSetEverything", hash);

    if (!fetchEverything) {
      this.fetchGameError = true;
      return;
    }

    this.game = this.$store.getters.getGame;

    const currentKey = JSON.parse(localStorage.getItem("myBeerTastingGameKey"));

    if (currentKey !== null && currentKey.game_id !== hash) {
      localStorage.removeItem("myBeerTastingGameKey");
    } else if (currentKey !== null) {
      this.alreadyJoined = true;
    }
  },
};
</script>
