<template>
  <div class="hero">
    <h1>Game progress</h1>
    <div class="players">
      <div class="card">
        <div class="card-header">Beer #1 - Done!</div>
        <div class="card-body"></div>
      </div>
      <div class="card">
        <div class="card-header">Beer #2 - Done!</div>
        <div class="card-body"></div>
      </div>
      <div class="card">
        <div class="card-header">Beer #3 - Enjoying right now</div>
        <div class="card-body"></div>
      </div>
      <div class="card">
        <div class="card-header">Beer #4 - Comming soon!</div>
        <div class="card-body"></div>
      </div>
    </div>

    <div>
      <router-link :to="{ name: 'CollectAnswers' }"
        >Collect answers</router-link
      >
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
