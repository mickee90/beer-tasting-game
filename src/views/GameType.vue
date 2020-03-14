<template>
  <div>
    <h1>Choose game type</h1>

    <beer-type-card header="Similar beers">
      The players will receive an image and description of 2 similar beers and
      the correct one for each beer you have registered.
    </beer-type-card>

    <beer-type-card header="Flavors">
      The players has to describe the flavors of each beer. You as the game
      master has to set the score based on the description of the beer when
      everyone is done.
    </beer-type-card>

    <beer-type-card header="Beer gurus">
      The players shall enter the name of the beer, type of beer and the
      brewery. i.e. they can get 3 points per beer
    </beer-type-card>

    <div>
      <router-link :to="{ name: 'ChooseBeers' }" class="btn btn-blue">Next</router-link>
    </div>
  </div>
</template>

<script>
import BeerTypeCard from "../components/Layout/BeerTypeCard";
export default {
  components: {
    BeerTypeCard
  }
};
</script>