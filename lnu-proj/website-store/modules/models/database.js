const mysql = require("mysql2");

const connection = mysql.createConnection({
    port:"3306",
    host:"localhost",
    user:"root",
    database:"users",
    password:"bohdanpassword"
});

module.exports = connection;