<template>
  <div class="border-b border-gray-300 bg-white mb-5 pb-5">
    <div class="text-xl mb-5" v-text="title"></div>

    <div class="flex mb-5">
      <div class="w-1/3">
        <img :src="`/img/${beer.image}`" alt />
      </div>
      <div class="w-2/3 text-left">
        <div>
          <strong v-text="beer.country"></strong>
        </div>
        <slot>{{ beer.description }}</slot>
      </div>
    </div>
    <div class="text-right mx-3">
      <button class="btn btn-gray" @click.prevent="$emit('delete', beer.id)">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["beer"],
  computed: {
    title() {
      return `#${this.beer.number} ${this.beer.name}`;
    }
  }
};
</script>