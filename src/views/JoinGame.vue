<template>
  <div>
    <h1>Waiting for the game to start</h1>
    <div class="mb-8 mt-2">
      <div class="border-b border-gray-300 mb-4 pb-4">
        <div class="text-xl">
          <div class="card-header">Player #1 - Joe Doe</div>
        </div>
      </div>
      <div class="border-b border-gray-300 mb-4 pb-4">
        <div class="text-xl">
          <div class="card-header">Player #2 - Jane Doe</div>
        </div>
      </div>
      <div class="border-b border-gray-300 mb-4 pb-4">
        <div class="text-xl">
          <div class="card-header">Player #3 - Mrs Smith</div>
        </div>
      </div>
    </div>

    <div class="mb-8">
      You can continue as soon as everyone has joined and the game master has
      started the game
    </div>

    <div>
      <router-link :to="{ name: 'GameRunning' }" class="btn btn-blue">Bring out the beer!</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>
