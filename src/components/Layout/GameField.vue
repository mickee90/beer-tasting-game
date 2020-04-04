<template>
  <div class="game_field" v-if="currentBeer === index">
    <h1>Beer #{{ beer.number }}</h1>
    <div>
      <label for="beerSearch">Which beer is it?</label>
      <br />
      <br />
      <guess-beer-card
        v-for="(beer, index) in beers"
        :key="beer.id"
        :beer="beer"
        :index="index"
        @selectBeer="onSelectBeer"
        :selected="selectedBeer !== null && selectedBeer.id === beer.id"
      />
      <div>
        <button
          class="btn btn-blue"
          :disabled="selectedBeer === null"
          :class="{ 'opacity-50 cursor-not-allowed': selectedBeer === null }"
          @click="goToNext"
        >
          {{ done === true ? "Submit answers" : "Next" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import GuessBeerCard from "./GuessBeerCard";
export default {
  props: ["beers", "beer", "currentBeer", "index", "done"],
  data() {
    return {
      selectedBeer: null,
    };
  },
  computed: {
    title() {
      return `#${this.beer.number} ${this.beer.name}`;
    },
    lastBeer() {
      return this.currentBeer === this.beers.length;
    },
  },
  methods: {
    onSelectBeer(beer) {
      this.selectedBeer = beer;
    },
    goToNext() {
      if (this.selectedBeer === null) return;

      this.$emit("selectedBeer", this.selectedBeer);

      if (!this.lastBeer) return;

      this.$emit("submitAnswers");
    },
  },
  components: {
    GuessBeerCard,
  },
};
</script>
