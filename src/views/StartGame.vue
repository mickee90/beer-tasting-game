<template>
  <div class="hero">
    <h1>Start the game</h1>
    <div class="players">
      <div class="card">
        <div class="card-header">Player #1 - Joe Doe</div>
        <div class="card-body"></div>
      </div>
      <div class="card">
        <div class="card-header">Player #2 - Jane Doe</div>
        <div class="card-body"></div>
      </div>
      <div class="card">
        <div class="card-header">Player #3 - Mrs Smith</div>
        <div class="card-body"></div>
      </div>
      <div class="card">
        <div class="card-header">Player #4 - Mr Smith</div>
        <div class="card-body"></div>
      </div>
    </div>

    <div>
      <router-link :to="{ name: 'GameProgress' }">Start the game!</router-link>
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
