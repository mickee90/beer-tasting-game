<template>
  <div>
    <h1>Create a new game</h1>
    <div class="mb-4">
      <label for="gameTitle" class="block text-gray-700 font-bold mb-2">Enter the name of the game</label>
      <input
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="gameTitle"
        v-model="title"
        placeholder="Name the game"
        required
      />
    </div>
    <div>
      <router-link :to="{ name: 'GameType' }" class="btn btn-blue">Next</router-link>
    </div>
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
