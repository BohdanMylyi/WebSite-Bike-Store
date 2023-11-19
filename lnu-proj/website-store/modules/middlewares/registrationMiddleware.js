const bcrypt = require('bcrypt');
const notifier = require('node-notifier');
const connection = require('../models/database');

const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sql = 'INSERT INTO userinf(username, email, password) VALUES (?, ?, ?)';
        const values = [username, email, hashedPassword];

        connection.query(sql, values, (error, results) => {
            if (error) {
                console.error(error);
                notifier.notify({
                    title: 'Error!',
                    message: 'Registration Error!',
                });
                res.status(500).send('Error');
                return;
            }
            next();
        });
    } catch (hashError) {
        console.error(hashError);
        notifier.notify({
            title: 'Error!',
            message: 'Hashing Error!',
        });
        res.status(500).send('Error');
    }
};

module.exports = {
    registerUser,
};
