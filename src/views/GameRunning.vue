<template>
  <div>
    <h1>Beer #1</h1>
    <div>
      <label for="beerSearch">Which beer is it?</label>
      <br />
      <br />
      <div class="flex">
        <guess-beer-card header="#1 3 Fonteinen" img="beer1.png"></guess-beer-card>
        <guess-beer-card header="#2 Barrel-aged Ten Fidy" img="beer2.jpg"></guess-beer-card>
        <guess-beer-card header="#3 Wild Barrel San Diego Vice Mixed Berry Bomb" img="beer3.jpeg"></guess-beer-card>
      </div>
      <div>
        <router-link :to="{ name: 'GameRunningTwo' }" class="btn btn-blue">Next</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import GuessBeerCard from "../components/Layout/GuessBeerCard";
export default {
  components: {
    GuessBeerCard
  }
};
</script>