<template>
  <div class="hero">
    <h1>Invite your friends</h1>
    <div>
      <div class="col-8">
        <router-link :to="{ name: 'InviteLink' }"
          >Copy this link and send to your friends</router-link
        >
      </div>
      <div class="col-4"><button>Copy</button></div>
    </div>
    <div>
      <br />
      <div>Or let them scan this QR code</div>
      <img src="/img/qrcode.png" alt="" />

      <div><router-link :to="{ name: 'StartGame' }">Next</router-link></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.chosenBeers {
  margin-top: 30px;
  margin-bottom: 30px;
}
.card {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.card-header {
  font-size: 1.25rem;
  margin-bottom: 10px;
}
.card-body {
  margin-bottom: 10px;
}

.card img {
  max-width: 100%;
  display: block;
  height: auto;
  margin: auto;
}

.col-4 {
  width: 33%;
  display: inline-block;
}
.col-8 {
  width: 66%;
  display: inline-block;
}
</style>
