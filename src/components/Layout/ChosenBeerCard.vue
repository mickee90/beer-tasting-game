<template>
  <div class="border-b border-gray-300 bg-white mb-5 pb-5" :class="cardHeight">
    <div class="flex mb-5">
      <div class="w-1/3 flex">
        <img :src="`${beer.image}`" :alt="beer.name" class="thumbnail" />
      </div>
      <div class="w-2/3 text-left">
        <div class="flex">
          <span v-text="title" class="text-xl"></span>
          <button
            class="btn btn-blue ml-auto px-2 py-1 text-xs mt-1"
            @click.prevent="$emit('delete', beer)"
          >
            Remove
          </button>
        </div>
        <div class="relative" :class="descHeight">
          <strong class="block" v-text="beer.country"></strong>
          <slot>{{ beer.description }}</slot>
          <div class="expand-btn" @click="onExpand" v-text="expandText"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["beer"],
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    title() {
      return `#${this.beer.number} ${this.beer.name}`;
    },
    cardHeight() {
      return this.expanded === true ? "h-auto" : "h-40";
    },
    descHeight() {
      return this.expanded === true ? "" : "h-32 overflow-hidden";
    },
    expandText() {
      return this.expanded === true ? "Collapse..." : "Expand...";
    }
  },
  methods: {
    onExpand() {
      this.expanded = !this.expanded;
    }
  }
};
</script>

<style scoped>
.thumbnail {
  max-width: 100px;
  margin: auto;
}
.expand-btn {
  position: absolute;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
  text-align: center;
  background: #ffffffc7;
  font-weight: bold;
  font-size: 1rem;
}
.expand-btn:hover {
  cursor: pointer;
}
</style>
