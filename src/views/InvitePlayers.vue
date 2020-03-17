<template>
  <div>
    <h1>Invite your friends</h1>
    <div>
      <div class="my-5">
        <button class="btn btn-blue" v-clipboard="() => gameUrl">
          Click to copy link
        </button>
      </div>
    </div>
    <div>
      <div
        class="w-100 text-center border-b border-gray-400 mx-auto my-5 text-lg"
      >
        Or let them scan this QR code
      </div>

      <div class="flex mb-5">
        <img src="/img/qrcode.png" alt class="mx-auto" />
      </div>

      <div>
        <router-link :to="{ name: 'StartGame' }" class="btn btn-blue">
          Next
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameUrl: null
    };
  },
  created() {
    this.gameUrl =
      window.location.host +
      this.$router.resolve({
        name: "InviteLink"
      }).href +
      `?hash=${this.$store.getters.getGame.id}`;
  }
};
</script>
