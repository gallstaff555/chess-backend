//set up Express server
const express = require("express");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");

//setup middleware
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

//auth0 set up
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: "a long, randomly-generated string stored in env",
    baseURL: "http://localhost:3000",
    clientID: "55ZMdiGL5bT0Y3M7OA3r5uQAQgcmJBR7",
    issuerBaseURL: "https://dev-490elg7s.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

//CORS set up
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

//TODO add saved games from db

//TODO add validation logic
app.get("/api/validate", (req, res, next) => {
    res.send({ "result": true });
});

//return new board state after AI makes a move
app.post("/api/aimove", (req, res, next) => {
    let boardState = req.body.boardState;
    let ai = aiMove(boardState, 2);
    let from = Object.keys(ai)[0];
    let to = ai[from];
    let updatedBoard = move(boardState, from, to);
    res.send(getFen(updatedBoard));
});

/*Graveyard
//return new board configuration (in FEN notation) after given move is applied
//NOTE: this does not yet implement validation
app.get("/api/move", (req, res, next) => {
    let updatedBoard = req.body.boardConfiguration;
    //TODO add validation
    res.send(updatedBoard);
});

app.get("/api/status", (req, res, next) => {
    res.send(status(req.body.boardConfiguration));
});

app.get("/api/aimove", (req, res, next) => {
    // aiMove(boardConfiguration, level = 2) - Return computed move
    // as an object like {"H7":"H5"}.
    // Use move(yourBoardConfiguration, from, to) to play this move.
});

app.post("/api/fen", (req, res, next) => {
    res.send(getFEN(req.body.boardConfiguration));
});

app.post("/api/moves", (req, res, next) => {
    res.send(moves(req.body));
});
*/
