<template>
  <div>
    <h1>Time to find some beers</h1>
    <div>
      <div class="mb-4">
        <label for="beerSearch" class="block text-gray-700 font-bold mb-2"
          >Search for the beer</label
        >

        <BaseInputText
          type="text"
          classes="text-center w-full"
          id="beerSearch"
          v-model="searchWord"
          @keyup.enter="onSearch"
          placeholder="Type the beer name and press Enter"
          required
        />

        <div v-if="beerSearchResult !== null">
          <SearchBeerCard
            v-for="(item, index) in beerSearchResult"
            :key="item.beer.bid"
            :beer="item.beer"
            :brewery="item.brewery"
            :add="true"
            :index="index"
            @addBeer="onAddedBeer"
          />
        </div>
      </div>

      <div class="py-8" v-if="beers.length > 0">
        <chosen-beer-card
          v-for="(beer, index) in beers"
          :key="beer.id"
          :beer="beer"
          :index="index"
          @delete="onDelete"
        ></chosen-beer-card>
      </div>

      <BaseButton @click="onCheckInBeers" :disabled="disabled" classes="mt-5"
        >Next</BaseButton
      >
    </div>
  </div>
</template>

<script>
import SearchBeerCard from "../components/Layout/SearchBeerCard";
import ChosenBeerCard from "../components/Layout/ChosenBeerCard";
import axios from "../axios/axiosUntappd";

export default {
  data() {
    return {
      searchWord: "",
      beerSearchResult: null,
      beers: [],
    };
  },
  methods: {
    onDelete(id) {
      const response = this.$store.dispatch("removeBeer", id);
      this.beerSearchResult = [];

      if (!response) {
        alert("Something went wrong. Try again");
        return;
      }
    },
    onAddedBeer(beer) {
      const response = this.$store.dispatch("addBeer", beer);
      this.beerSearchResult = [];
      this.searchWord = "";

      if (!response) {
        alert("Something went wrong. Try again");
        return;
      }
    },
    async onSearch() {
      if (this.searchWord.trim() === "") {
        return;
      }

      const response = await axios
        .get(`/search/beer?q=${this.searchWord.trim()}`)
        .then((res) => res.data);

      if (!response || response.response.beers.items.length === 0) return;

      this.beerSearchResult = response.response.beers.items;
    },
    onCheckInBeers() {
      if (this.beers.length === 0) {
        alert("Choose at least two beers");
        return;
      }

      const game = this.$store.getters.getGame;

      const beers = this.beers.map((beer) => {
        return {
          ...beer,
          game_id: game.id,
          game_type_id: game.game_type_id,
          correct_answer: beer.number,
        };
      });

      let nextPage = "InvitePlayers";
      if (game.game_type_id === 2) {
        nextPage = "CreateQuestions";
      }

      const response = this.$store.dispatch("storeBeers", beers);

      if (!response) {
        alert("Something went wrong. Try again");
        return;
      }

      this.$router.push({ name: nextPage });
    },
  },
  computed: {
    disabled() {
      return this.beers.length < 1;
    },
  },
  created() {
    this.beers = this.$store.getters.getBeers;
  },
  components: {
    ChosenBeerCard,
    SearchBeerCard,
  },
};
</script>
