//set up Express server
const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 4001;

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});

//import on-the-fly chess game functions
import { Game, move, status, moves, aiMove } from "./chess-engine/js-chess-engine.mjs";
import { NEW_GAME_BOARD_CONFIG } from "./chess-engine/const/board.mjs";
console.log(moves(NEW_GAME_BOARD_CONFIG));

app.get("/api/newgame", (req, res, next) => {
    res.send(moves(NEW_GAME_BOARD_CONFIG));
});
