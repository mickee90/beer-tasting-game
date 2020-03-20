<template>
  <div>
    <h1>Waiting for the game to start</h1>
    <div class="mb-8 mt-2">
      <div
        class="border-b border-gray-300 mb-4 pb-4"
        v-for="(player, index) in players"
        :key="player.id"
      >
        <div class="text-xl">
          <div class="card-header">
            Player #{{ index + 1 }} - {{ player.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="mb-8">
      You can continue as soon as everyone has joined and the game master has
      started the game
    </div>

    <button v-if="!game.started" class="btn btn-blue" disabled>
      Waiting...
    </button>
    <button v-else class="btn btn-blue" @click="onStartGame">
      Bring out the beer!
    </button>
    <!-- <router-link :to="{ name: 'GameRunning' }" class="btn btn-blue">Bring out the beer!</router-link> -->
  </div>
</template>

<script>
import store from "../store/index";
import gql from "graphql-tag";
export default {
  data() {
    return {
      players: [],
      game: null
    };
  },
  methods: {
    onStartGame() {
      this.$router.push({ name: "GameRunning" });
    }
  },
  mounted() {
    this.game = this.$store.getters.getGame;
  },
  created() {
    this.$apollo.queries.tags.subscribeToMore({
      players: {
        document: gql`
          subscription subscribePlayers($game_id: uuid!) {
            players(where: { game_id: { _eq: $game_id } }) {
              id
              name
              game_id
              created_at
              score
            }
          }
        `,
        variables: {
          game_id: store.getters.getGame.id
        }
      }
    });
  }
  // apollo: {
  //   tags: {
  //     subscribeToMore: {
  //       players: {
  //         document: gql`
  //           subscription subscribePlayers($game_id: uuid!) {
  //             players(where: { game_id: { _eq: $game_id } }) {
  //               id
  //               name
  //               game_id
  //               created_at
  //               score
  //             }
  //           }
  //         `,
  //         variables: {
  //           game_id: store.getters.getGame.id
  //         }
  //       }
  //     }
  //   }
  // }
  // apollo: {
  //   $subscribe: {
  //     players: {
  //       query: require("../graphql/subscriptions/subscribePlayers.gql"),
  //       variables: {
  //         game_id: store.getters.getGame.id
  //       },
  //       result(data) {
  //         this.players = data.data.players;
  //       }
  //     }
  //   }
  // }
};
</script>
