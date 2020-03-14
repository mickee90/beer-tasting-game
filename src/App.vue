<template>
  <div id="app">
    <div class="max-w-lg m-auto py-16">
      <!-- <app-nav></app-nav> -->
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  width: 100vw;
}
</style>
