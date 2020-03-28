<template>
  <div v-if="game">
    <h1>Game progress</h1>
    <div class="mb-8">
      <div
        class="border-b border-gray-300 mb-4 pb-4"
        v-for="(beer, index) in beers"
        :key="beer.id"
      >
        <div class="text-xl">
          <div class="card-header">
            Beer #{{ index + 1 }} -
            {{ finishedText(beer, index) }}
            <div></div>
          </div>
        </div>
      </div>
    </div>

    <BaseButton class="btn btn-blue" @click="goToNext" :disabled="!gameDone">
      {{
        gameDone === true
          ? goToNextTitle
          : "Waiting for the players to drink up..."
      }}
    </BaseButton>
  </div>
</template>

<script>
import store from "../store/index";
export default {
  data() {
    return {
      beers: [],
      player_answers: [],
      game: null
    };
  },
  methods: {
    finishedText(beer, index) {
      if (beer.finished) {
        return "Done!";
      }

      if ((index === 0 || this.beers[index - 1].finished) && !beer.finished) {
        return "In progress...";
      }

      if (
        index > 1 &&
        this.beers[index - 2].finished &&
        !this.beers[index - 1].finished &&
        !beer.finished
      ) {
        return "Next up. Prepare the beer!";
      }

      return "Coming soon!";
    },
    async goToNext() {
      if (this.game.game_type_id === 1) {
        await this.$store.dispatch("setGameCompleted");

        this.$router.push({ name: "Scoreboard" });
      } else {
        // @todo prepare for other game types which might need manuall checking of results (e.g. redirect to CollectAnswers)
        this.$router.push({ name: "Scoreboard" });
      }
    }
    // async onStartGame() {
    //   const response = await this.$store.dispatch("updateGame", {
    //     started: true
    //   });
    //   if (!response) {
    //     alert("Something went wrong. Try again");
    //     return;
    //   }
    //   this.$router.push({ name: "GameProgress" });
    // },
    // onGoToGame() {
    //   this.$router.push({ name: "GameProgress" });
    // }
  },
  computed: {
    gameDone() {
      if (this.beers.length === 0) return;

      return (
        this.beers.filter(beer => beer.finished === true).length ===
        this.beers.length
      );
    },
    goToNextTitle() {
      if (this.game.game_type_id === 1) {
        return "Everyone is finished. Let's go to the scoreboard!";
      } else {
        // @todo prepare for other game types which might need manuall checking of results
        return "Everyone is finished. Let's collect the answers.";
      }
    }
  },
  mounted() {
    this.game = this.$store.getters.getGame;
  },
  apollo: {
    $subscribe: {
      gameAndPlayers: {
        query: require("../graphql/subscriptions/subscribeEverything.gql"),
        variables: {
          game_id: store.getters.getGame.id
        },
        result(data) {
          console.log(data);
          const game = data.data.game;

          // this.game = { ...this.game, started: game.started };
          console.log(this.game);
          this.player_answers = game.player_answers;
          this.beers = game.beers.map(beer => {
            const answers = game.player_answers.filter(
              answer => answer.beer_id === beer.id
            );

            // @todo should not be possible with more answers than number of players
            // Make sure we can change this to === later
            return {
              ...beer,
              finished: answers.length >= game.players.length
            };
          });
        }
      }
    }
  }
};
</script>
