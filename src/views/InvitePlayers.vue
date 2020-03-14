<template>
  <div>
    <h1>Invite your friends</h1>
    <div>
      <div class="w-100">
        <router-link :to="{ name: 'InviteLink' }">Copy this link and send to your friends</router-link>
      </div>
      <div class="my-5">
        <button class="btn btn-blue">Copy</button>
      </div>
    </div>
    <div>
      <div
        class="w-100 text-center border-b border-gray-400 mx-auto my-5 text-lg"
      >Or let them scan this QR code</div>

      <div class="flex mb-5">
        <img src="/img/qrcode.png" alt class="mx-auto" />
      </div>

      <div>
        <router-link :to="{ name: 'StartGame' }" class="btn btn-blue">Next</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
