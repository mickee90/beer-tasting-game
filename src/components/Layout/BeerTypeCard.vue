<template>
  <div class="border-b border-gray-300 bg-white mb-5" :class="classes">
    <div class="text-xl mb-5" v-text="header"></div>
    <div class="mb-5">
      <slot></slot>
    </div>
    <div class="mb-5">
      <label for class="block font-bold">
        <input
          type="checkbox"
          class="mr-2 leading-tight"
          :disabled="disabled"
          :value="gameTypeId"
          :checked="parseInt(selectedGameTypeId) === parseInt(gameTypeId)"
        />
        <span class>Choose this option</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["header", "gameTypeId", "classes", "disabled", "selectedGameTypeId"]
};
</script>
<style scoped>
.disabled {
  opacity: 0.5;
}
</style>
