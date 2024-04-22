const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3002;

const connection = mysql.createConnection({
    port: "3306",
    host: "localhost",
    user: "root",
    database: "users",
    password: "bohdanpassword"
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database as ID ' + connection.threadId);
});

app.get('/getProducts', async (req, res) => {
    const { type } = req.query;
    let query = 'SELECT * FROM products';

    if (type) {
        query = `SELECT * FROM products WHERE type = '${type}'`;
    }

    try {
        const results = await queryDatabase(query);
        res.json(results);
    } catch (error) {
        console.error('Error executing query: ' + error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function queryDatabase(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

app.listen(port, () => {
    console.log(`Catalog server is running at http://localhost:${port}`);
});
