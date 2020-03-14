<template>
  <div>
    <h1>Start the game</h1>
    <div class="mb-8">
      <div class="border-b border-gray-300 mb-4 pb-4">
        <div class="text-xl">Player #1 - Joe Doe</div>
      </div>
      <div class="border-b border-gray-300 mb-4 pb-4">
        <div class="text-xl">Player #2 - Jane Doe</div>
        <div class="card-body"></div>
      </div>
      <div class="border-b border-gray-300 mb-4 pb-4">
        <div class="text-xl">Player #3 - Mrs Smith</div>
      </div>
      <div class="border-b border-gray-300 mb-4 pb-4">
        <div class="text-xl">Player #4 - Mr Smith</div>
      </div>
    </div>

    <div>
      <router-link :to="{ name: 'GameProgress' }" class="btn btn-blue">Start the game!</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>
