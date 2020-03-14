<template>
  <div>
    <h1>Beer #2</h1>
    <label class="block">
      <span class="text-gray-700">How does it taste?</span>
      <textarea
        rows="5"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
      ></textarea>
    </label>
    <div>
      <router-link :to="{ name: 'GameRunningThree' }" class="btn btn-blue">Next</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>