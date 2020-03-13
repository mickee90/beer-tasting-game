<template>
  <div class="hero">
    <h1>The beer tasting game!</h1>
    <div v-if="backdoor">
      <router-link :to="{ name: 'create' }">Start a new game!</router-link>
    </div>
    <div v-else>
      <h3>This site will hopefully be ready soon...</h3>
    </div>
    <img src="/img/beer.jpg" alt />
    <div>
      What's this all about?
      <br />
      <br />- This is a game where one person (the "game master") buys and set
      up a beer tasting without the players knowing which beers they are
      drinking.
      <br />
      <br />

      <ul>
        <li>Pick one game master who buys X amount of beers.</li>
        <li>
          The game master creates a game by entering the name, the beers and
          game type.
        </li>
        <li>
          Then sends an invite to the players by sharing a link, or let them
          scan the barcode provided.
        </li>
        <li>The players join the game and the beer tasting can begin!</li>
        <li>
          When all beer have been tasted and registrated, the game is over and
          the players will end up on a scoreboard
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backdoor: false
    };
  },
  created() {
    if ("backdoor" in this.$route.query) {
      this.backdoor = true;
    }
  }
};
</script>

<style>
.hero {
  margin: auto;
  max-width: 500px;
}
.hero img {
  width: 300px;
}
</style>
