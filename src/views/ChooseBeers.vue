<template>
  <div>
    <h1>Time to find some beers</h1>
    <div>
      <div class="mb-4">
        <label
          for="beerSearch"
          class="block text-gray-700 font-bold mb-2"
        >Search or scan for the beer</label>
        <input
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
          id="beerSearch"
          placeholder="Type the beer name"
          required
        />
      </div>

      <div class="w-1/2 text-center border-b border-gray-400 mx-auto mb-5 text-lg">Or</div>

      <button class="btn btn-gray">Scan barcode</button>

      <div class="py-16">
        <beer-card header="#1 3 Fonteinen" img="beer1.png" country="Oude Geuze - Belgium">
          Blend of 1, 2, and 3 year old lambics. A true Geuze - a blend of
          1, 2, and 3 year-old lambic, unfiltered and unpasteurized, and
          aged in the bottle for at least a year after blending.
          Refermentation in the bottle gives this Geuze its famous
          champagne-like spritziness.
        </beer-card>

        <beer-card
          header="#2 Barrel-aged Ten Fidy"
          img="beer2.jpg"
          country="Oskar Blues Brewery - USA"
        >
          Aged through four seasons and from a blend of the top Bourbons
          around, this Ten Fidy has morphed into a monster of cranked up
          flavor. Espresso, burnt sugar, rich chocolate, caramel notes are
          now driving alongside the vanilla, oak, bourbon from the barrel
          and been smoothed out during maturation.
        </beer-card>

        <beer-card
          header="#3 Wild Barrel San Diego Vice Mixed Berry Bomb"
          img="beer3.jpeg"
          country="Sour - Berliner Weisse - USA"
        >
          Ripe berries-blueberry, blackberry, boysenberry, strawberry
          <br />

          <strong>Appearance</strong> Dark purple with pink/purple head
          <br />

          <strong>Aroma</strong> Refreshing big ripe berry fruit notes
          <br />

          <strong>Flavor</strong> Rich juicy berries w/ a nice tart acidic
          finish
          <br />
        </beer-card>
      </div>
      <div>
        <router-link :to="{ name: 'InvitePlayers' }" class="btn btn-blue">Next</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BeerCard from "../components/Layout/BeerCard";
export default {
  components: {
    BeerCard
  }
};
</script>