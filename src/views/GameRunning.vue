<template>
  <div>
    <!-- <carousel :data="[<game-field v-for="beer in beers" :key="beer.id" :beer="beer" />]"></carousel> -->
    <game-field
      class="game_field"
      v-for="beer in beers"
      :key="beer.id"
      :beer="beer"
      :beers="beers"
      @selectBeer="selectedBeer"
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
      this.playerAnswers[this.currentBeer] = beer.number;

      if (this.currentBeer === this.beers.length) {
        this.done = true;
        alert("done!");
        return;
      }

      this.currentBeer++;
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

    console.log(response);
    if (!response) return;

    console.log(response);

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
