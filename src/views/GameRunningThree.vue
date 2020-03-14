<template>
  <div>
    <h1>Beer #3</h1>
    <h2 class="underline">The beer guru</h2>
    <div class="mb-8">
      <card header="Name the beer!">
        <input
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
          placeholder="Name"
        />
      </card>

      <card header="What type of beer is it?">
        <input
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
          placeholder="Type"
        />
      </card>

      <card header="Which brewery brews it?">
        <input
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
          placeholder="Brewery"
        />
      </card>
    </div>
    <div>
      <router-link :to="{ name: 'AwaitResults' }" class="btn btn-blue">Next</router-link>
    </div>
  </div>
</template>

<script>
import Card from "../components/Layout/Card";
export default {
  components: {
    Card
  }
};
</script>
