<template>
  <div class="border-b border-gray-300 bg-white mb-5 pb-5">
    <div class="text-xl mb-5" v-text="header"></div>

    <div class="w-full mb-5">
      <slot></slot>
    </div>
    <div class="w-full mx-3">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["header"]
};
</script>