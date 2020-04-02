<template>
  <div>
    <h1>The beer tasting game!</h1>
    <div v-if="backdoor" class="mb-4">
      <div class="mb-10">
        <router-link :to="{ name: 'Create' }" class="btn btn-blue"
          >Start a new game!</router-link
        >
      </div>
      <div>
        <router-link :to="{ name: 'FindGame' }" class="btn btn-blue"
          >Find game</router-link
        >
      </div>
    </div>
    <div v-else>
      <h3>This site will hopefully be ready soon...</h3>
    </div>
    <img src="/img/beer.jpg" alt />
    <div>
      What's this all about?
      <br />
      <br />
      <i>
        Set up a blind-tasting to find out who of your friends knows most about
        beers!
      </i>
      <br />
      <br />

      <ul class="list-disc">
        <li class="mb-2">Pick one game master who buys X numbers of beers.</li>
        <li class="mb-2">
          The game master creates a game by entering the name, the beers and
          game type.
        </li>
        <li class="mb-2">
          The players can then scan a QR-code or the game master sends out the
          link for them to join the game.
        </li>
        <li class="mb-2">
          The players join the game and the beer tasting can begin!
        </li>
        <li class="mb-2">
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
