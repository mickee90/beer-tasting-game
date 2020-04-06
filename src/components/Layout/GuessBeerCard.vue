<template>
  <div
    class="border-b border-gray-300 bg-white mb-5 pb-5 pt-5 pr-5 w-full box-content relative overflow-hidden"
    :class="[cardHeight, { expanded: expanded }, `beerTotalHeight-${index}`]"
  >
    <div class="flex mb-5">
      <div class="w-1/3 flex">
        <img :src="`${beer.image}`" :alt="beer.name" class="mb-auto mx-auto" />
      </div>
      <div class="w-2/3 text-left pr-5">
        <div class="flex" :class="`beerTitleHeight-${index}`">
          <span
            v-text="beer.name"
            class="text-xl"
            :class="{ 'font-bold': selected }"
          ></span>
          <button
            class="btn btn-blue ml-auto px-2 py-1 text-xs mt-1 h-full"
            @click.prevent="$emit('selectBeer', beer)"
            :class="{ 'opacity-50 cursor-not-allowed': selected }"
          >
            {{ selected ? "This one!" : "Choose" }}
          </button>
        </div>
        <div :class="`beerContentHeight-${index}`">
          <strong class="block" v-text="beer.country"></strong>
          <slot>{{ beer.description }}</slot>
          <div class="expand-btn" @click="onExpand" v-if="expandableText">
            <font-awesome-icon
              icon="angle-double-up"
              v-if="expanded === true"
              class="text-2xl"
            />
            <font-awesome-icon
              icon="angle-double-down"
              class="text-2xl"
              v-else
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["beer", "selected", "index"],
  data() {
    return {
      toHigh: false,
      expanded: false,
    };
  },
  computed: {
    title() {
      return `#${this.beer.number} ${this.beer.name}`;
    },
    cardHeight() {
      return this.expanded === true ? "h-auto" : "h-40";
    },
    expandableText() {
      return this.toHigh;
    },
  },
  methods: {
    onExpand() {
      this.expanded = !this.expanded;
    },
  },
  mounted() {
    const beerCardTotalHeight = document.querySelector(
      `.beerTotalHeight-${this.index}`
    ).clientHeight;
    const beerCardTitleHeight = document.querySelector(
      `.beerTitleHeight-${this.index}`
    ).clientHeight;
    const beerCardContentHeight = document.querySelector(
      `.beerContentHeight-${this.index}`
    ).clientHeight;

    if (beerCardTotalHeight <= beerCardTitleHeight + beerCardContentHeight) {
      this.toHigh = true;
    }
  },
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
