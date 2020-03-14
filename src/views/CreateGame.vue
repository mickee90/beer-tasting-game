<template>
  <div>
    <h1>Create a new game</h1>
    <div class="mb-6">
      <label for="gameTitle" class="block text-gray-700 font-bold mb-2">Enter the name of the game</label>
      <input
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="gameTitle"
        v-model="title"
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
    <div>
      <button
        class="btn btn-blue btn:disabled"
        :disabled="disabled"
        @click.prevent="onStoreGame"
      >Next</button>
      <!-- <router-link :to="{ name: 'GameType' }" class="btn btn-blue">Next</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      game_master_name: ""
    };
  },
  computed: {
    disabled() {
      return this.title.trim() === "" || this.game_master_name.trim() === "";
    }
  },
  methods: {
    onStoreGame() {
      const response = this.$store.dispatch("storeGame", {
        title: this.title,
        game_master_name: this.game_master_name
      });

      if (!response) {
        alert("Something went wrong. Try again");
        return;
      }

      this.$router.push({ name: "GameType" });
    }
  }
};
</script>
