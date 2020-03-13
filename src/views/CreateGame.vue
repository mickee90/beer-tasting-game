<template>
  <div class="hero">
    <h1>Create a new game</h1>
    <div>
      <label for="gameTitle">Enter the name of the game</label><br />
      <input
        type="text"
        id="gameTitle"
        v-model="title"
        placeholder="Name the game"
        required
      />
    </div>
    <div><router-link :to="{ name: 'GameType' }">Next</router-link></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  }
};
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
