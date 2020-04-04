<template>
  <div>
    <h1>Invite your friends</h1>
    <div class="my-5">
      <div class="w-100 text-center mx-auto my-5 text-lg">
        1. Copy and send the link by text or email
      </div>

      <BaseButton v-clipboard="() => gameUrl">Click to copy link</BaseButton>
    </div>
    <div class="w-100 text-center mx-auto my-2 text-lg">
      2. Or let them scan this QR code
    </div>

    <div class="flex mb-5">
      <VueQrcode
        :value="gameUrl"
        :options="{ width: 200 }"
        class="mx-auto"
      ></VueQrcode>
    </div>

    <router-link :to="{ name: 'StartGame' }" class="btn btn-blue">
      Next
    </router-link>
  </div>
</template>

<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  data() {
    return {
      gameUrl: null
    };
  },
  created() {
    this.gameUrl =
      process.env.VUE_APP_HOST_NAME +
      this.$router.resolve({
        name: "InviteLink"
      }).href +
      `?hash=${this.$store.getters.getGame.id}`;
  },
  components: { VueQrcode }
};
</script>
