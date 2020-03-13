<template>
  <div class="hero">
    <h1>Waiting for the game to start</h1>
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
    </div>

    <div>
      You can continue as soon as everyone has joined and the game master has
      started the game
    </div>

    <div>
      <router-link :to="{ name: 'GameRunning' }"
        >Bring out the beer!</router-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.hero {
  margin: auto;
  max-width: 500px;
}
.hero img {
  width: 300px;
}
</style>
