<template>
  <div class="border-b border-gray-300 bg-white mb-5 pb-5">
    <div class="text-xl mb-5" v-text="header"></div>

    <div class="flex mb-5">
      <div class="w-1/3">
        <img :src="`/img/${img}`" alt />
      </div>
      <div class="w-2/3 text-left">
        <div>
          <strong v-text="country"></strong>
        </div>
        <slot></slot>
      </div>
    </div>
    <div class="text-right mx-3">
      <button class="btn btn-gray">Remove</button>
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