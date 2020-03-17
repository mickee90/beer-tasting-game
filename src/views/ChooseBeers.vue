<template>
  <div>
    <h1>Time to find some beers</h1>
    <div>
      <div class="mb-4">
        <label for="beerSearch" class="block text-gray-700 font-bold mb-2"
          >Search or scan for the beer</label
        >
        <input
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
          id="beerSearch"
          placeholder="Type the beer name"
          required
          v-model="searchWord"
          @keyup.enter="onSearch"
        />

        <div v-if="beerSearchResult !== null">
          <SearchBeerCard
            v-for="item in beerSearchResult"
            :key="item.beer.bid"
            :beer="item.beer"
            :brewery="item.brewery"
            :add="true"
            @addBeer="onAddedBeer"
          />
        </div>
      </div>

      <div
        class="w-1/2 text-center border-b border-gray-400 mx-auto mb-5 text-lg"
      >
        Or
      </div>

      <button class="btn btn-gray">Scan barcode</button>

      <div class="py-16">
        <chosen-beer-card
          v-for="beer in beers"
          :key="beer.id"
          :beer="beer"
          @delete="onDelete"
        ></chosen-beer-card>
      </div>
      <button
        class="btn btn-blue btn:disabled"
        :disabled="disabled"
        @click.prevent="onCheckInBeers"
      >
        Next
      </button>
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
      beers: []
    };
  },
  methods: {
    onDelete(id) {
      const index = this.beers.findIndex(beer => beer.id === id);
      this.beers.splice(index, 1);
    },
    onAddedBeer(beer) {
      const response = this.$store.dispatch("addBeer", beer);

      if (!response) {
        alert("Something went wrong. Try again");
        return;
      }
    },
    async onSearch() {
      if (this.searchWord.trim() === "") {
        return;
      }

      // const beers = this.$store.dispatch("searchBeer", this.searchWord.trim());
      const response = await axios
        .get(`/search/beer?q=${this.searchWord.trim()}`)
        .then(res => res.data);

      console.log(response);

      if (!response || response.response.beers.items.length === 0) return;

      this.beerSearchResult = response.response.beers.items;

      // this.beers.push(beer);
    },
    onCheckInBeers() {
      if (this.beers.length === 0) {
        alert("Choose at least two beers");
        return;
      }

      const game = this.$store.getters.getGame;

      const beers = this.beers.map(beer => {
        return {
          ...beer,
          game_id: game.id,
          game_type_id: game.game_type_id,
          correct_answer: beer.number
        };
      });

      let nextPage = "InvitePlayers";
      if (game.game_type_id === 2) {
        nextPage = "CreateQuestions";
        //const questions = this.createQuestions(beers);
      }

      const response = this.$store.dispatch("storeBeers", beers);

      if (!response) {
        alert("Something went wrong. Try again");
        return;
      }

      this.$router.push({ name: nextPage });
    }
  },
  computed: {
    disabled() {
      return this.beers.length < 1;
    }
  },
  created() {
    this.beers = this.$store.getters.getBeers;
  },
  components: {
    ChosenBeerCard,
    SearchBeerCard
  }
};
</script>
