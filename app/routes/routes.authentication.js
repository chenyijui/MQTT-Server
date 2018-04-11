module.exports = function(app) {
    const passport = require('passport');
    const users = require('../controller/controller.user');
    //user signin
    app.post('/signin', function (req, res, next) {
        passport.authenticate('login', function (err, user) {
            if(err) {
            // handle youself
            return res.status(500).send({message: "system error"} );
            }
            if(!user) {
                return res.status(404).send({message: "username or password error"});
            }
            req.login(user, function (err) {
                if (err) {
                    return next(err)
                }
                console.log('routes===============');
                console.log(req.session);
                console.log('routes===============' );
                console.log(req.user);
                return res.send({message: "signing successfully"})
            })
        })(req, res, next)
    });
    //user signup
    app.post('/signup', function (req, res, next) {
        passport.authenticate('signup', function (err, user) {
            console.log(user);
            if(err) {
                return res.status(500).send({message: "system error"} );
            }
            if(!user) {
                return res.status(202).send({message: 'You have already registered.'});
            }else {
                return res.status(200).send({message: 'signup successfully'});
            }
        })(req, res, next)
    });
    //user logout
    app.get('/logout',(req, res) => {
        //handle with passport
        req.logout();
        console.log('=======/signout=====')
        console.log(req.session);
        if(req.session){
            req.session = null;
        } else {
            res.send({message: "can not logout"});
        }
        res.send({message: "success logout"});
    });
}