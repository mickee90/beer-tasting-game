<template>
  <div>
    <h1>Waiting for the results</h1>
    <div class="mb-8">
      <p>Waiting for the game master to collect the answers.</p>
      <p>Let's have a beer while waiting..</p>
    </div>

    <div>
      <router-link :to="{ name: 'Scoreboard' }" class="btn btn-blue">Scoreboard</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>