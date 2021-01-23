//set up Express server
const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const auth0Config = require("./config/config");

//setup middleware

//CORS set up
app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(router..) should be the last thing called

const server = http.createServer(app);
const PORT = process.env.PORT || 4001;

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});

//import on-the-fly chess game functions
import { Game, move, status, moves, aiMove, getFen } from "./chess-engine/js-chess-engine.mjs";
import { NEW_GAME_BOARD_CONFIG } from "./chess-engine/const/board.mjs";

//const { chess } = require('./chess.js');
//const chess = new Chess();

//auth0 set up
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");

// auth router attaches /login, /logout, and /callback routes to the baseURL
//
app.use(auth(auth0Config));

app.get("/", (req, res, next) => {
    res.send("Welcome to muggle chess");
});

// req.isAuthenticated is provided from the auth router
app.get("/login", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

//***Chess specific API: ***

//return a new game configuration in FEN notation
app.get("/api/newgame", (req, res, next) => {
    res.send(getFen(NEW_GAME_BOARD_CONFIG));
});

//Returns the updated board state after a given move is calculated
app.post("/api/move", (req, res, next) => {
    console.log(`New board state: ${req.body.fen}`);
});
