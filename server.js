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

app.get("/api/move", (req, res, next) => {
    res.send(move(req.body.boardConfiguration, req.body.from, req.body.to));
});

app.get("/api/status", (req, res, next) => {
    res.send(status(req.body.boardConfiguration));
});

app.get("/api/moves", (req, res, next) => {
    res.send(moves(req.body.boardConfiguration));
});

app.get("/api/aimove", (req, res, next) => {
    // aiMove(boardConfiguration, level = 2) - Return computed move
    // as an object like {"H7":"H5"}.
    // Use move(yourBoardConfiguration, from, to) to play this move.
});
