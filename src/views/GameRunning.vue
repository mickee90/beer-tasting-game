<template>
  <div>
    <!-- <carousel :data="[<game-field v-for="beer in beers" :key="beer.id" :beer="beer" />]"></carousel> -->
    <game-field
      class="game_field"
      v-for="(beer, index) in beers"
      :key="beer.id"
      :beer="beer"
      :beers="beers"
      :index="index+1"
      :currentBeer="currentBeer"
      @selectedBeer="selectedBeer"
      @submitAnswers="onSubmittedAnswers"
    />
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
      playerAnswers: {}
    };
  },
  methods: {
    selectedBeer(beer) {
      const currentBeerId = this.beers[this.currentBeer - 1].id;
      this.playerAnswers.push({
        current_beer_id: currentBeerId,
        answer: beer.number,
        beer_id: beer.id
      });

      if (this.currentBeer === this.beers.length) {
        this.done = true;
        return;
      }

      this.currentBeer++;
    },
    async onSubmittedAnswers() {
      if (!this.done) return;

      const result = await this.$store.dispatch(
        "storePlayerAnswers",
        this.playerAnswers
      );

      if (!result) {
        alert("Something went wrong. Reload and try again");
        return;
      }

      this.$router.push({ name: "AwaitResults" });
    }
  },
  async created() {
    const game = this.$store.getters.getGame;
    // const playerId = this.$store.getters.getPlayer.id;

    const response = await this.$apollo
      .query({
        query: require("../graphql/queries/getGamePlayingData.gql"),
        variables: {
          id: game.id,
          player_id: { _eq: 11 }
        }
      })
      .then(res => res.data.game)
      .catch(err => console.log(err));

    if (!response) return;

    this.game = {
      ...game,
      finished: response.finished,
      started: response.started
    };

    this.beers = response.beers.map(beer => {
      beer.beer_answers = response.beer_answers.filter(
        beer_answer => beer_answer.beer_id === beer.id
      );
      return beer;
    });

    this.player = { ...response.players[0] };
    // this.beers = response.beers;
    // this.beerAnswers = response.beer_answers;
    this.playerAnswers = response.player_answers;
  },
  components: {
    GameField
  }
};
</script>
