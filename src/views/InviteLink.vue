<template>
  <div class="hero">
    <h1>Welcome to THE NAME OF THE GAME</h1>
    <div>
      <label for="playerName">Enter your name to join the game</label><br />
      <input type="text" id="playerName" placeholder="Your name" required />
    </div>
    <div>
      <router-link :to="{ name: 'JoinGame' }">Join the game</router-link>
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
