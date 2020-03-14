<template>
  <div class="hero">
    <h1>Game progress</h1>
    <div class="mb-8">
      <div class="border-b border-gray-300 mb-4 pb-4">
        <div class="text-xl">
          <div class="card-header">Beer #1 - Done!</div>
        </div>
      </div>
      <div class="border-b border-gray-300 mb-4 pb-4">
        <div class="text-xl">
          <div class="card-header">Beer #2 - Done!!</div>
        </div>
      </div>
      <div class="border-b border-gray-300 mb-4 pb-4">
        <div class="text-xl">
          <div class="card-header">Beer #3 - Enjoying right now</div>
        </div>
      </div>
      <div class="border-b border-gray-300 mb-4 pb-4">
        <div class="text-xl">
          <div class="card-header">Beer #4 - Comming soon!</div>
        </div>
      </div>
    </div>

    <div>
      <router-link :to="{ name: 'CollectAnswers' }" class="btn btn-blue">Collect answers</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>