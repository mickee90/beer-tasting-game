<template>
  <div>
    <h1>Create a new game</h1>
    <div class="mb-6">
      <label for="gameName" class="block text-gray-700 font-bold mb-2">Enter the name of the game</label>
      <input
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="gameName"
        v-model="name"
        placeholder="Name the game"
        required
      />
    </div>
    <div class="mb-6">
      <label for="gameMasterName" class="block text-gray-700 font-bold mb-2">Enter your name</label>
      <input
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="gameMasterName"
        v-model="game_master_name"
        placeholder="Your name"
        required
      />
    </div>
    <button class="btn btn-blue btn:disabled" :disabled="disabled" @click.prevent="onStoreGame">Next</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      game_master_name: ""
    };
  },
  computed: {
    disabled() {
      return this.name.trim() === "" || this.game_master_name.trim() === "";
    }
  },
  methods: {
    async onStoreGame() {
      const response = await this.$store.dispatch("createGame", {
        name: this.name,
        game_master_name: this.game_master_name
      });

      if (!response) {
        alert("Something went wrong. Try again");
        return;
      }

      this.$router.push({ name: "GameType" });
    }
  },
  created() {
    // this.name = this.$store.getters.getGame.name ?? "";
    // this.game_master_name = this.$store.getters.getGame.game_master_name ?? "";
  }
};
</script>
