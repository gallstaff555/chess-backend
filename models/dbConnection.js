//SQL db connection
const sql = require("mssql");
const config = require("../config/config");

const getPosition = async () => {
    try {
        await sql.connect(config.sql.connectionString);
        const result = await sql.query`select B.Position from Board as B inner join Game as G on B.BoardID = G.BoardID`;
        return result.recordset[0];
    } catch (err) {
        console.log("error retrieving from db.");
    }
};

const updatePosition = async (newPosition) => {
    try {
        await sql.connect(config.sql.connectionString);
        await sql.query`UPDATE Board set Position = ${newPosition} where BoardID = 1`;
    } catch (err) {
        console.log("error retrieving from db.");
    }
};

exports.getPosition = getPosition;
exports.updatePosition = updatePosition;
