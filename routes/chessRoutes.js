const express = require("express");
const router = express.Router();

router.get("/api/newgame", (req, res, next) => {
    res.send("new game");
});

//Returns the updated board state after a given move is calculated
router.post("/api/move", (req, res, next) => {
    console.log(`New board state: ${req.body.fen}`);
    res.sendStatus(200);
});

module.exports = router;
