<template>
  <div>
    <h1>Create a new game</h1>
    <div class="mb-6">
      <label for="gameName" class="block text-gray-700 font-bold mb-2"
        >Enter the name of the game</label
      >
      <BaseInputText
        type="text"
        id="gameName"
        v-model="name"
        placeholder="Name the game"
        required
      />
    </div>
    <div class="mb-6">
      <label for="gameMasterName" class="block text-gray-700 font-bold mb-2"
        >Enter your name</label
      >
      <BaseInputText
        type="text"
        id="gameMasterName"
        v-model="game_master_name"
        placeholder="Your name"
        required
      />
    </div>
    <BaseButton @click="onStoreGame" :disabled="disabled">Next</BaseButton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      game_master_name: "",
    };
  },
  computed: {
    disabled() {
      return this.name.trim() === "" || this.game_master_name.trim() === "";
    },
  },
  methods: {
    async onStoreGame() {
      const response = await this.$store.dispatch("createGame", {
        name: this.name,
        game_master_name: this.game_master_name,
      });

      if (!response) {
        alert("Something went wrong. Try again");
        return;
      }

      this.$router.push({ name: "GameType" });
    },
  },
};
</script>
