<template>
  <div>
    <h1>Welcome to {{ game.name }}</h1>

    <div class="mb-4">
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
    </div>
    <div>
      <button @click.prevent="onJoinGame" class="btn btn-blue">
        Join the game
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      game: null,
      playerName: ""
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
  created() {
    this.game = this.$store.getters.getGame;
  }
};
</script>
