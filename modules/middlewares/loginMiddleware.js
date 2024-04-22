const bcrypt = require('bcrypt');
const notifier = require('node-notifier');
const connection = require('../models/database');

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const sql = 'SELECT * FROM userinf WHERE username = ?';
        const values = [username];

        connection.query(sql, values, async (error, results) => {
            if (error) {
                console.error(error);
                notifier.notify({
                    title: 'Error!',
                    message: 'Authorization error!',
                });
                res.status(500).send('Error');
                return;
            }

            if (results.length === 0) {
                notifier.notify({
                    title: 'Error!',
                    message: 'User is not found!',
                });
                res.redirect('/register');
                return;
            }

            const hashedPassword = results[0].password;
            const isMatch = await bcrypt.compare(password, hashedPassword);

            if (isMatch) {
                next();
            } else {
                notifier.notify({
                    title: 'Error!',
                    message: 'Wrong password! Try again!',
                });
                res.redirect('/login');
            }
        });
    } catch (compareError) {
        console.error(compareError);
        notifier.notify({
            title: 'Error!',
            message: 'Authorization Error!',
        });
        res.status(500).send('Error');
    }
};

module.exports = {
    loginUser,
};
