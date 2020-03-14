<template>
  <div class="border-b border-gray-300 bg-white mb-5 pb-5">
    <div class="text-xl mb-5" v-text="header"></div>

    <div class="flex mb-5">
      <div class="w-100">
        <img :src="`/img/${img}`" alt />
      </div>
    </div>
    <div class="mx-3 text-center">
      <button class="btn btn-gray">This one!</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["header", "img", "country"]
};
</script>

<style>
</style>