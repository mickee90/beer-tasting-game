`mutation createGames {
  insert_games(objects: {name: "${payload.name}", game_master_name: "${payload.game_master_name}"}) {
    returning {
      id
      name
      game_master_name
      started
      finished
      ua
      created_at
    }
  }
}`;
