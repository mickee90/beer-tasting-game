<template>
  <div>
    <h1>Choose game type</h1>

    <beer-type-card
      header="Match the description"
      gameTypeId="1"
      :disabled="true"
      :selectedGameTypeId="gameTypeId"
    >
      The players will receive the description of each beer and then try to
      match them while tasting the beers
    </beer-type-card>

    <beer-type-card
      header="Pick one option"
      gameTypeId="2"
      :selectedGameTypeId="gameTypeId"
      classes="disabled"
      :disabled="true"
      customLabel="Coming soon"
    >
      The game master enter a question and 2-4 answer alternatives for each
      beer.
      <br />E.g "What type of beer is this?"
      <ul>
        <li>1. Lager</li>
        <li>2. IPA</li>
        <li>3. Porter</li>
        <li>4. Sour</li>
      </ul>
    </beer-type-card>

    <BaseButton @click="onChooseGameType" :disabled="disabled">Next</BaseButton>
  </div>
</template>

<script>
// @todo Add more game types after first release

import BeerTypeCard from "../components/Layout/BeerTypeCard";
export default {
  data() {
    return {
      gameTypeId: 1
    };
  },
  methods: {
    async onChooseGameType() {
      const game = this.$store.getters.getGame;

      if (game.id === null || this.gameTypeId === null) {
        alert("Somethings wrong. Please try again");
        return;
      }

      const response = await this.$store.dispatch("updateGame", {
        game_type_id: this.gameTypeId
      });

      if (!response) {
        alert("Something went wrong. Try again");
        return;
      }

      this.$router.push({ name: "ChooseBeers" });
    }
  },
  computed: {
    disabled() {
      return !(this.gameTypeId > 0);
    }
  },
  components: {
    BeerTypeCard
  }
};
</script>
