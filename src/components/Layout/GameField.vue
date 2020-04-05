<template>
  <div class="game_field" v-if="currentBeer === index">
    <h1>Beer #{{ beer.number }}</h1>
    <div>
      <label for="beerSearch">Which beer is it?</label>
      <br />
      <br />
      <guess-beer-card
        v-for="(beer_answer, index) in beer.beer_answers"
        :key="beer_answer.id"
        :beer="beer_answer.beer"
        :index="index"
        @selectBeer="onSelectBeer"
        :selected="
          selectedBeer !== null && selectedBeer.id === beer_answer.beer.id
        "
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
  props: ["beer", "currentBeer", "index", "done"],
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
      return this.currentBeer === this.beer.beer_answers.length;
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
