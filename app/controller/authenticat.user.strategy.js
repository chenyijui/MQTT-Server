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

// passport logout
passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, function(req, username, password, done) {
        User.findOne({username:username},function(err, user) {
            if(err) {
                console.log('======passport signup err======');
                console.log(err);
                return done(err)
            }
            if(user) {
                console.log('You have already registered.');
                console.log('======passport signup find user======');
                console.log(user);
                return done(null, false)
            }
            if(!req.body.name || !req.body.email || !req.body.username || !req.body.password) {
                return done(null, false)                                
            } else {
                var role = 'user';
                var user = new User({
                    role: req.body.role || role,
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
                });
                user.save(function(err, user) {
                    console.log("user save successfully");
                    if(err) {
                        console.log("ERROR");
                    }
                    return done(null, user);
                })
            }    
        })
    }
))