<template>
  <div
    class="border-b border-gray-300 bg-white pb-5 box-content overflow-hidden relative flex"
    :class="[cardHeight, { expanded: expanded }]"
  >
    <div class="flex mb-5 w-full">
      <div class="w-1/3 flex">
        <img
          :src="`${beer.beer_label}`"
          :alt="beer.beer_name"
          class="thumbnail"
        />
      </div>
      <div class="w-2/3 text-left pt-5 pr-5">
        <div class="flex">
          <span v-text="beer.beer_name" class="text-xl"></span>
          <button
            class="btn btn-blue ml-auto px-2 py-1 text-xs mt-1 h-full"
            @click.prevent="$emit('addBeer', { beer, brewery })"
          >
            Add
          </button>
        </div>
        <div :class="descHeight">
          <strong class="block" v-text="brewery.country_name"></strong>
          <slot>{{ beer.beer_description }}</slot>
          <div class="expand-btn" @click="onExpand" v-text="expandText"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["beer", "brewery"],
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
      return this.expanded === true ? "Collapse" : "Expand";
    }
  },
  methods: {
    onExpand() {
      this.expanded = !this.expanded;
    }
  },
  created() {
    // console.log(this.beer, this.brewery);
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
  line-height: 2rem;
}
.expanded .expand-btn {
  /* bottom: -30px; */
}
.expand-btn:hover {
  cursor: pointer;
}
</style>
