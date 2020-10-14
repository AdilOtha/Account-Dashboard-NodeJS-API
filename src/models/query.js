const util = require('util');
const mysql = require('mysql');
const dbConfig = require("../config/db.config.js");

module.exports = function makeDb() {
    const connection = mysql.createPool({
        connectionLimit: dbConfig.CONNECTION_LIMIT,
        host: dbConfig.HOST,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DB
    });
    // open the MySQL connection
    //console.log(connection.state)
    // if (connection.state === "disconnected") {
    //     connection.connect(error => {
    //         if (error) throw error;
    //         console.log(connection.state)
    //         //console.log("Successfully connected to the mysql database.");
    //     });
    // }
    //console.log(connection.state);
    return {
        query(sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        }
    };
}