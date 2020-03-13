<template>
  <div class="hero">
    <h1>Time to find some beers</h1>
    <div>
      <label for="beerSearch">Search or scan for the beer</label>
      <br />
      <input type="text" id="beerSearch" placeholder="Type the beer name" />
      <br />
      <div>Or</div>
      <button>Scan barcode</button>
      <div class="chosenBeers">
        <div class="card">
          <div class="card-header">#1 3 Fonteinen</div>
          <div class="card-body">
            <div class="col-4">
              <img src="/img/beer1.png" alt="" />
            </div>
            <div class="col-8">
              <div><strong>Oude Geuze - Belgium</strong></div>
              TBlend of 1, 2, and 3 year old lambics. A true Geuze - a blend of
              1, 2, and 3 year-old lambic, unfiltered and unpasteurized, and
              aged in the bottle for at least a year after blending.
              Refermentation in the bottle gives this Geuze its famous
              champagne-like spritziness.
            </div>
          </div>
          <div class="card-footer">
            <button>Remove</button>
          </div>
        </div>

        <div class="card">
          <div class="card-header">#2 Barrel-aged Ten Fidy</div>
          <div class="card-body">
            <div class="col-4">
              <img src="/img/beer2.jpg" alt="" />
            </div>
            <div class="col-8">
              <div><strong>Oskar Blues Brewery - USA</strong></div>
              Aged through four seasons and from a blend of the top Bourbons
              around, this Ten Fidy has morphed into a monster of cranked up
              flavor. Espresso, burnt sugar, rich chocolate, caramel notes are
              now driving alongside the vanilla, oak, bourbon from the barrel
              and been smoothed out during maturation.
            </div>
          </div>
          <div class="card-footer">
            <button>Remove</button>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            #3 Wild Barrel San Diego Vice Mixed Berry Bomb
          </div>
          <div class="card-body">
            <div class="col-4">
              <img src="/img/beer3.jpeg" alt="" />
            </div>
            <div class="col-8">
              <div><strong>Sour - Berliner Weisse - USA</strong></div>
              Ripe berries-blueberry, blackberry, boysenberry, strawberry<br />

              <strong>Appearance</strong> Dark purple with pink/purple head
              <br />

              <strong>Aroma</strong> Refreshing big ripe berry fruit notes
              <br />

              <strong>Flavor</strong> Rich juicy berries w/ a nice tart acidic
              finish<br />
            </div>
          </div>
          <div class="card-footer">
            <button>Remove</button>
          </div>
        </div>
      </div>
      <div><router-link :to="{ name: 'InvitePlayers' }">Next</router-link></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.chosenBeers {
  margin-top: 30px;
  margin-bottom: 30px;
}
.card {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.card-header {
  font-size: 1.25rem;
  margin-bottom: 10px;
}
.card-body {
  margin-bottom: 10px;
}

.card img {
  max-width: 100%;
  display: block;
  height: auto;
  margin: auto;
}

.col-4 {
  width: 33%;
  display: inline-block;
}
.col-8 {
  width: 66%;
  display: inline-block;
}
</style>
