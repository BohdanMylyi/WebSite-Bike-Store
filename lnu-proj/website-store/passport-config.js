const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { use } = require("./login/loginRoutes");

function initialize(passport, getUserByUsername){
    const authenticateUser= async(username, password, done) => {
        const user = getUserByUsername(username);

        if(user == null) {
            return done(null, false, {message: "No User Found with that username!"});
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
        } catch(err) {
            console.log(err);
            return done(err);
        }
    }

    passport.use(new localStrategy({usernameField: 'username'}));
    passport.serializeUser((user, done) => {});
    passport.deserializeUser((id, done) => {});

}

module.exports = initialize;
