<template>
  <div>
    <h1>Time to find some beers</h1>
    <div>
      <div class="mb-4">
        <label for="beerSearch" class="block text-gray-700 font-bold mb-2"
          >Search or scan for the beer</label
        >

        <BaseInputText
          type="text"
          classes="text-center"
          id="beerSearch"
          v-model="searchWord"
          @keyup.enter="onSearch"
          placeholder="Type the beer name and press Enter"
          required
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

      <button
        class="btn btn-gray"
        @click="showBarcodeScanner = !showBarcodeScanner"
      >
        Scan barcode
      </button>

      <div>{{ scanData }}</div>

      <v-quagga
        v-if="showBarcodeScanner"
        :onDetected="logIt"
        :readerSize="readerSize"
        :readerType="'ean_reader'"
        :aspectRatio="aspectRatio"
        style="z-index:999"
      ></v-quagga>

      <div class="py-8" v-if="beers.length > 0">
        <chosen-beer-card
          v-for="beer in beers"
          :key="beer.id"
          :beer="beer"
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
      showBarcodeScanner: false,
      readerSize: {
        width: 640,
        height: 480
      },
      aspectRatio: { min: 1, max: 2 },
      detecteds: [],
      scanData: ""
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
    logIt(data) {
      console.log("detected", data);
      this.scanData = data;
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
