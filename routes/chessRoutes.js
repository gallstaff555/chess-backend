const express = require("express");
const router = express.Router();

//SQL db connection
const sql = require("../models/dbConnection");

//start a new game
router.get("/api/newgame", (req, res, next) => {
    res.send("new game");
});

//retrieve the most recent board state
router.get("/api/boardstate", async (req, res, next) => {
    res.send(await sql.getPosition());
});

//Returns the updated board state after a given move is calculated
router.post("/api/move", async (req, res, next) => {
    console.log(`New board state: ${req.body.fen}`);
    await sql.updatePosition(req.body.fen); //update db with new board position
    res.sendStatus(200);
});

module.exports = router;
