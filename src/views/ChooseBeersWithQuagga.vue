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

      <div id="interactive" class="viewport scanner">
        <video />
        <canvas class="drawingBuffer" />
      </div>

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
import Quagga from "quagga";

export default {
  data() {
    return {
      searchWord: "",
      beerSearchResult: null,
      beers: [],
      showBarcodeScanner: false,
      quaggaState: {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: "environment",
            aspectRatio: { min: 1, max: 2 },
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: 2,
        frequency: 10,
        decoder: {
          readers: ["ean_reader"],
        },
        locate: true,
      },
    };
  },
  methods: {
    onDetected(result) {
      console.log("detected: ", result);
    },
    onProcessed(result) {
      let drawingCtx = Quagga.canvas.ctx.overlay;
      let drawingCanvas = Quagga.canvas.dom.overlay;
      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2,
              });
            });
        }
        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2,
          });
        }
        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    },
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

      console.log(response);

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
    console.log(Quagga);
  },
  mounted() {
    Quagga.init(this.quaggaState, function (err) {
      if (err) {
        return console.error(err);
      }
      Quagga.start();
    });
    Quagga.onDetected(this.onDetected);
    Quagga.onProcessed(this.onProcessed);
  },
  destroyed: function () {
    Quagga.stop();
  },
  components: {
    ChosenBeerCard,
    SearchBeerCard,
  },
};
</script>

<style scoped>
.viewport {
  position: relative;
}
.viewport canvas,
.viewport video {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
