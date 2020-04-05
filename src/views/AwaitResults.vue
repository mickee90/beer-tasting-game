<template>
  <div>
    <h1>Waiting for the results</h1>
    <div class="mb-8">
      <p>Waiting for the game master to collect the answers.</p>
      <p>Let's have another beer while waiting..</p>
    </div>
  </div>
</template>

<script>
import store from "../store/index";
// import router from "../router/index";

export default {
  data() {
    return {
      game: null,
    };
  },
  apollo: {
    game: {
      query: require("../graphql/queries/getGame.gql"),
      variables() {
        return {
          id: store.getters.getGame.id,
        };
      },
      update(data) {
        return { ...data };
      },
      subscribeToMore: [
        {
          document: require("../graphql/subscriptions/subscribeGame.gql"),
          variables() {
            return {
              id: store.getters.getGame.id,
            };
          },
          updateQuery: (previous, { subscriptionData }) => {
            if (subscriptionData.data.game.finished === true) {
              store.dispatch("finalizeGame");
              // router.push({ name: "Scoreboard" });
            }

            return { ...subscriptionData.data };
          },
        },
      ],
    },
  },
};
</script>
