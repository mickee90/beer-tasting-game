<template>
  <div v-if="player">
    <!-- <carousel :data="[<game-field v-for="beer in beers" :key="beer.id" :beer="beer" />]"></carousel> -->
    <div v-if="player.finished === true">
      <div class="mb-5">You have already submitted your answers.</div>
      <router-link :to="{name: 'AwaitResults'}" class="btn btn-blue">Go to scoreboard</router-link>
    </div>
    <div v-else>
      <game-field
        class="game_field"
        v-for="(beer, index) in beers"
        :key="beer.id"
        :beer="beer"
        :beers="beers"
        :index="index+1"
        :done="done"
        :currentBeer="currentBeer"
        @selectedBeer="selectedBeer"
        @submitAnswers="onSubmittedAnswers"
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
      playerAnswers: []
    };
  },
  methods: {
    async selectedBeer(beer) {
      console.log("selectedBeer");
      const currentBeerId = this.beers[this.currentBeer - 1].id;
      // const existingIndex = this.playerAnswers.findIndex(
      //   answer => answer.current_beer_id === currentBeerId
      // );
      const answer = {
        current_beer_id: currentBeerId,
        answer: beer.number,
        beer_id: beer.id
      };

      console.log("selectedBeer2");
      const result = await this.$store.dispatch("storePlayerAnswer", answer);

      if (!result) {
        alert("Something went wrong. Reload and try again");
        return;
      }
      // if (existingIndex) {
      //   this.playerAnswers.splice(existingIndex, 1, {
      //     ...this.playerAnswers[existingIndex],
      //     ...answer
      //   });
      // } else {
      // this.playerAnswers.push(answer);
      // }

      console.log("selectedBeer3");
      if (this.currentBeer === this.beers.length) {
        this.done = true;

        console.log("selectedBeer4");
        return;
      }

      console.log("selectedBeer5");
      scrollTo(0, 0);
      this.currentBeer++;
    },
    async onSubmittedAnswers() {
      console.log("onSubmittedAnswers");
      if (!this.done) return;

      const finished = await this.$store.dispatch("setPlayerFinishGame");
      if (!finished) {
        alert("Something went wrong. Reload and try again");
        return;
      }
      console.log("onSubmittedAnswers2");

      this.$router.push({ name: "AwaitResults" });
    }
  },
  async created() {
    const game = this.$store.getters.getGame;
    const playerId = this.$store.getters.getPlayer.id;

    const response = await this.$apollo
      .query({
        query: require("../graphql/queries/getGamePlayingData.gql"),
        variables: {
          id: game.id,
          player_id: { _eq: playerId }
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
    // this.playerAnswers = response.player_answers;
  },
  components: {
    GameField
  }
};
</script>
