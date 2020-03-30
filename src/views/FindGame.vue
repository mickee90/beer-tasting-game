<template>
  <div>
    <h1>Create a new game</h1>
    <div class="mb-6">
      <!-- <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream> -->
      <p class="decode-result">
        Last result: <b>{{ result }}</b>
      </p>

      <qrcode-drop-zone @decode="onDecode" @init="logErrors">
        <qrcode-stream @decode="onDecode" @init="onInit" />
      </qrcode-drop-zone>

      <qrcode-capture v-if="noStreamApiSupport" @decode="onDecode" />
    </div>
    <div class="mb-6">
      <label for="gameMasterName" class="block text-gray-700 font-bold mb-2"
        >Enter your name</label
      >
      <BaseInputText
        type="text"
        id="gameMasterName"
        v-model="game_master_name"
        placeholder="Your name"
        required
      />
    </div>
    <BaseButton @click="onStoreGame" :disabled="disabled">Next</BaseButton>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";

export default {
  data() {
    return {
      name: "",
      game_master_name: "",
      result: "",
      noStreamApiSupport: false
    };
  },
  computed: {
    disabled() {
      return this.name.trim() === "" || this.game_master_name.trim() === "";
    }
  },
  methods: {
    async onStoreGame() {
      const response = await this.$store.dispatch("createGame", {
        name: this.name,
        game_master_name: this.game_master_name
      });

      if (!response) {
        alert("Something went wrong. Try again");
        return;
      }

      this.$router.push({ name: "GameType" });
    },
    onDecode(result) {
      this.result = result;
    },

    logErrors(promise) {
      promise.catch(console.error);
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "StreamApiNotSupportedError") {
          this.noStreamApiSupport = true;
        }
      }
    }
  },
  created() {
    // this.name = this.$store.getters.getGame.name ?? "";
    // this.game_master_name = this.$store.getters.getGame.game_master_name ?? "";
  },
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  }
};
</script>
