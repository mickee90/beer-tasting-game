import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import CreateGame from "../views/CreateGame";
import GameType from "../views/GameType";
import ChooseBeers from "../views/ChooseBeers";
import InvitePlayers from "../views/InvitePlayers";
import StartGame from "../views/StartGame";
import GameProgress from "../views/GameProgress";
import CollectAnswers from "../views/CollectAnswers";
import Scoreboard from "../views/Scoreboard";
import InviteLink from "../views/InviteLink";
import JoinGame from "../views/JoinGame";
import GameRunning from "../views/GameRunning";
import GameRunningTwo from "../views/GameRunningTwo";
import GameRunningThree from "../views/GameRunningThree";
import AwaitResults from "../views/AwaitResults";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/create",
    name: "create",
    component: CreateGame
  },
  {
    path: "/game-type",
    name: "GameType",
    component: GameType
  },
  {
    path: "/choose-beers",
    name: "ChooseBeers",
    component: ChooseBeers
  },
  {
    path: "/invite-players",
    name: "InvitePlayers",
    component: InvitePlayers
  },
  {
    path: "/start-game",
    name: "StartGame",
    component: StartGame
  },
  {
    path: "/game-progress",
    name: "GameProgress",
    component: GameProgress
  },
  {
    path: "/collect-answers",
    name: "CollectAnswers",
    component: CollectAnswers
  },
  {
    path: "/scoreboard",
    name: "Scoreboard",
    component: Scoreboard
  },
  {
    path: "/invite-link",
    name: "InviteLink",
    component: InviteLink
  },
  {
    path: "/join-game",
    name: "JoinGame",
    component: JoinGame
  },
  {
    path: "/game-running",
    name: "GameRunning",
    component: GameRunning
  },
  {
    path: "/game-running-two",
    name: "GameRunningTwo",
    component: GameRunningTwo
  },
  {
    path: "/game-running-three",
    name: "GameRunningThree",
    component: GameRunningThree
  },
  {
    path: "/await-results",
    name: "AwaitResults",
    component: AwaitResults
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
