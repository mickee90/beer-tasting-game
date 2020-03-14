<template>
  <div>
    <h1>Welcome to THE NAME OF THE GAME</h1>

    <div class="mb-4">
      <label
        for="playerName"
        class="block text-gray-700 font-bold mb-2"
      >Enter your name to join the game</label>
      <input
        type="text"
        class="shadow appearance-none border rounded mb-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center w-3/4"
        id="playerName"
        placeholder="Your name"
        required
      />
    </div>
    <div>
      <router-link :to="{ name: 'JoinGame' }" class="btn btn-blue">Join the game</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>