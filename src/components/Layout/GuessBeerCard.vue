<template>
  <div class="flex flex-col border-b border-gray-300 bg-white mb-5 pb-5">
    <div class="text-xl mb-5" v-text="header"></div>

    <div class="mb-5 w-100 my-auto">
      <img :src="`/img/${img}`" alt />
    </div>
    <div class="mx-3 text-center mt-auto">
      <button class="btn btn-gray">This one!</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["header", "img", "country"]
};
</script>