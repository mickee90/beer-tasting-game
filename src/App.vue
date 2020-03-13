<template>
  <div id="app">
    <!-- <app-nav></app-nav> -->
    <router-view :key="$route.fullPath" />
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
