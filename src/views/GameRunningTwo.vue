<template>
  <div class="hero">
    <h1>Beer #2</h1>
    <div>
      <label for="beerSearch">How does it taste?</label>
      <br />
      <br />
      <div>
        <textarea cols="30" rows="10"> </textarea>
      </div>
      <div>
        <router-link :to="{ name: 'GameRunningThree' }">Next</router-link>
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
