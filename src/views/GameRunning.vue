<template>
  <div v-if="player">
    <!-- <carousel :data="[<game-field v-for="beer in beers" :key="beer.id" :beer="beer" />]"></carousel> -->
    <div v-if="player.finished === true">
      <div class="mb-5">You have already submitted your answers.</div>
      <router-link :to="{ name: 'AwaitResults' }" class="btn btn-blue"
        >Go to scoreboard</router-link
      >
    </div>
    <div v-else-if="done === true">
      <h3>No more beers :(</h3>
      <button class="btn btn-blue mt-5" @click="onSubmittedAnswers">
        Submit answers
      </button>
    </div>
    <div v-else>
      <game-field
        class="game_field"
        v-for="(beer, index) in beers"
        :key="beer.id"
        :beer="beer"
        :index="index + 1"
        :done="done"
        :currentBeer="currentBeer"
        @selectedBeer="selectedBeer"
      />
    </div>
  </div>
</template>

<script>
import GameField from "../components/Layout/GameField";
export default {
  data() {
    return {
      game: null,
      player: null,
      currentBeer: 1,
      done: false,
      beers: [],
      playerAnswers: [],
    };
  },
  methods: {
    async selectedBeer(beer) {
      const currentBeerId = this.beers[this.currentBeer - 1].id;
      const answer = {
        current_beer_id: currentBeerId,
        answer: beer.number,
        beer_id: beer.id,
      };

      const result = await this.$store.dispatch("storePlayerAnswer", answer);

      if (!result) {
        alert("Something went wrong. Reload and try again");
        return;
      }

      if (this.currentBeer === this.beers.length) {
        this.done = true;
        return;
      }

      scrollTo(0, 0);
      this.currentBeer++;
    },
    async onSubmittedAnswers() {
      if (!this.done) return;

      const finished = await this.$store.dispatch("setPlayerFinishGame");
      if (!finished) {
        alert("Something went wrong. Reload and try again");
        return;
      }

      this.$router.push({ name: "AwaitResults" });
    },
  },
  async mounted() {
    const game = this.$store.getters.getGame;
    const playerId = this.$store.getters.getPlayer.id;

    const response = await this.$apollo
      .query({
        query: require("../graphql/queries/getGamePlayingData.gql"),
        variables: {
          id: game.id,
          player_id: { _eq: playerId },
        },
      })
      .then((res) => res.data.game)
      .catch((err) => console.log(err));

    if (!response) return;

    this.game = {
      ...game,
      finished: response.finished,
      started: response.started,
    };

    this.beers = response.beers.map((beer) => {
      beer.beer_answers = response.beer_answers
        .filter((beer_answer) => beer_answer.beer_id === beer.id)
        .map((beer_answer1) => {
          beer_answer1.beer = response.beers.find(
            (beer) =>
              // beer.id === beer_answer1.beer_id &&
              beer.number === parseInt(beer_answer1.question_content)
          );
          return beer_answer1;
        })
        .sort((a, b) =>
          a.sort_order > b.sort_order ? 1 : b.sort_order > a.sort_order ? -1 : 0
        );
      return beer;
    });

    this.player = { ...response.players[0] };
  },
  components: {
    GameField,
  },
};
</script>
