//set up Express server
const express = require("express");
const http = require("http");
const app = express();
const config = require("./config/config");
const chessRoutes = require("./routes/chessRoutes");

//setup middleware
const bodyParser = require("body-parser");

//CORS set up
const cors = require("cors");

let allowedOrigins = ["https://muggle-chess.netlify.app", "http://localhost:3000"];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "\n Custom error: The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    })
);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", `${config.allowOrigin.url}`); // "https://muggle-chess.netlify.app" update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use("/", chessRoutes);

app.get("/", (req, res, next) => {
    res.send("Welcome to muggle chess");
});

const server = http.createServer(app);
const PORT = process.env.PORT || 4001;

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});

/* GRAVEYARD:

//res.header("Access-Control-Allow-Origin", "*");
// res.header("Access-Control-Allow-Credentials", true);
// res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
// res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");


//app.use(cors());
//app.options("*", cors());
//app.options("*", cors());
// app.use(
//     cors({
//         origin: true,
//         credentials: true,
//         methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE", "HEAD"],
//     })
// );
//app.options("*", cors());
//

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://gallstaff555.github.io/muggle-chess-client/");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });

// //return a new game configuration in FEN notation
// app.get("/api/newgame", (req, res, next) => {
//     res.send(getFen(NEW_GAME_BOARD_CONFIG));
// });

// //Returns the updated board state after a given move is calculated
// app.post("/api/move", (req, res, next) => {
//     console.log(`New board state: ${req.body.fen}`);
//     res.sendStatus(200);
// });

*/
