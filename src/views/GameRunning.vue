<template>
  <div class="hero">
    <h1>Beer #1</h1>
    <div>
      <label for="beerSearch">Which beer is it?</label>
      <br />
      <br />
      <div class="chosenBeers">
        <div class="card col-4">
          <div class="card-header">#1 3 Fonteinen</div>
          <div class="card-body">
            <img src="/img/beer1.png" alt="" />
          </div>
          <div class="card-footer">
            <button>This one!</button>
          </div>
        </div>

        <div class="card col-4">
          <div class="card-header">#2 Barrel-aged Ten Fidy</div>
          <div class="card-body">
            <img src="/img/beer2.jpg" alt="" />
          </div>
          <div class="card-footer">
            <button>This one!</button>
          </div>
        </div>

        <div class="card col-4">
          <div class="card-header">
            #3 Wild Barrel San Diego Vice Mixed Berry Bomb
          </div>
          <div class="card-body">
            <img src="/img/beer3.jpeg" alt="" />
          </div>
          <div class="card-footer">
            <button>This one!</button>
          </div>
        </div>
      </div>
      <div>
        <router-link :to="{ name: 'GameRunningTwo' }">Next</router-link>
      </div>
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
