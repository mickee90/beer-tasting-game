<template>
  <div>
    <h1>Scoreboard</h1>
    <div class="mb-8">
      <div
        class="border-b border-gray-300 mb-4 pb-4"
        v-for="(player, index) in players"
        :key="player.id"
      >
        <div class="text-xl">
          <div class="card-header">
            Player #{{ index + 1 }} - {{ player.name }} - {{ player.score }}p
          </div>
        </div>
      </div>
    </div>
    <router-link to="/?backdoor" class="btn btn-blue"
      >Back to start</router-link
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      players: []
    };
  },
  async created() {
    await this.$store.dispatch("setGameCompleted");

    const players = this.$store.getters.getPlayers;
    this.players = players.sort((a, b) =>
      a.score < b.score ? 1 : b.score < a.score ? -1 : 0
    );
  }
};
</script>
