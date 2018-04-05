const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../module/module.user');
const bcrypt = require('bcrypt-nodejs');
//user._id store in session
passport.serializeUser(function (user, done) {
    done(null, user._id);
});
//從DB裡面找使用者資料
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
});
// passport login
passport.use('login', new LocalStrategy({
    passReqToCallback: true
    },
    function(req, username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) {
              return done(err)
            }
            if (!user) {
              return done(null, false)
              console.log('User not found.');
            }
            var isValidPassword = function (user, password) {
                return bcrypt.compareSync(password, user.password)
            }
            if (!isValidPassword(user, password)) {
                return done(null, false)
                console.log('User not found.');
            }
            return done(null, user)
        });
    }
));