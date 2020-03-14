<template>
  <div class="hero">
    <h1>Waiting for the results</h1>
    <div>
      Waiting for the game master to collect the answers.
      <br />Let's have a beer while waiting
    </div>

    <div>
      <router-link :to="{ name: 'Scoreboard' }">Scoreboard</router-link>
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
