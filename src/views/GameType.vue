<template>
  <div class="hero">
    <h1>Choose game type</h1>
    <div class="card">
      <div class="card-header">Similar beers</div>
      <div class="card-body">
        The players will receive an image and description of 2 similar beers and
        the correct one for each beer you have registered.
      </div>
      <div class="card-footer">
        <button>Choose this option</button>
      </div>
    </div>

    <div class="card">
      <div class="card-header">Flavors</div>
      <div class="card-body">
        The players has to describe the flavors of each beer. You as the game
        master has to set the score based on the description of the beer when
        everyone is done.
      </div>
      <div class="card-footer">
        <button>Choose this option</button>
      </div>
    </div>

    <div class="card">
      <div class="card-header">Beer gurus</div>
      <div class="card-body">
        The players shall enter the name of the beer, type of beer and the
        brewery. i.e. they can get 3 points per beer
      </div>
      <div class="card-footer">
        <button>Choose this option</button>
      </div>
    </div>

    <div><router-link :to="{ name: 'ChooseBeers' }">Next</router-link></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
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
</style>
