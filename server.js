//set up Express server
const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 4001;

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});

//set up Chess games
const Board = require("./models/board");
const { v4: uuidv4 } = require("uuid");
const currentGames = [];

app.get("/api/board", (req, res, next) => {
    res.send(game.exportJson());
});

app.get("/api/test", (req, res, next) => {
    res.send("test test test");
});

app.post("/api/newgame", (req, res, next) => {
    const game = new Board();
    let game_id = uuidv4();
    currentGames.push({ game_id: game });
    res.send({ id: game_id, game: game.exportJson() });
});

let createGame = () => {
    const game = new Board();
    let game_id = uuidv4();
    currentGames.push({ game_id: game });
};
