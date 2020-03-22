<template>
  <div class="game_field">
    <h1>Beer #{{ beer.number }}</h1>
    <div>
      <label for="beerSearch">Which beer is it?</label>
      <br />
      <br />
      <guess-beer-card
        v-for="beer in beers"
        :key="beer.id"
        :beer="beer"
        @selectBeer="value => $emit('selectedBeer', value)"
      />
      <div>
        <router-link :to="{ name: 'GameRunningTwo' }" class="btn btn-blue"
          >Next</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import GuessBeerCard from "./GuessBeerCard";
export default {
  props: ["beers", "beer"],
  computed: {
    title() {
      return `#${this.beer.number} ${this.beer.name}`;
    }
  },
  components: {
    GuessBeerCard
  }
};
</script>
