<template>
  <div class="hero">
    <h1>Beer #3</h1>
    <div>
      <label for="beerSearch">The beer guru</label>
      <br />
      <br />
      <div class="players">
        <div class="card">
          <div class="card-header">Name the beer!</div>
          <div class="card-body">
            <input type="text" placeholder="Name" />
          </div>
        </div>
        <div class="card">
          <div class="card-header">What type of beer is it?</div>
          <div class="card-body">
            <input type="text" placeholder="Type" />
          </div>
        </div>
        <div class="card">
          <div class="card-header">Which brewery brews it?</div>
          <div class="card-body">
            <input type="text" placeholder="Brewery" />
          </div>
        </div>
      </div>
      <div>
        <router-link :to="{ name: 'AwaitResults' }">Next</router-link>
      </div>
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
