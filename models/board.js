const jsChessEngine = require("js-chess-engine");

class Board {
    constructor() {
        this.board = new jsChessEngine.Game();
    }

    move(from, to) {
        const moveablePieces = this.eligibleMoves();
        let destinations = moveablePieces[from];
        if (destinations && destinations.includes(to)) {
            this.board.move(from, to);
        } else {
            console.log("illegal move!");
        }
    }

    eligibleMoves(from) {
        return this.board.moves(from);
    }

    printBoard() {
        this.board.printToConsole();
    }
}

module.exports = Board;
