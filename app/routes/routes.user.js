module.exports = function(app) {
    const passport = require('passport');
    const users = require('../controller/controller.user');
    //creat a new user
    app.post('/users', users.creat);
    //find all user
    app.get('/users', users.findAll);
    //find one user
    app.get('/users/:userId', users.findOne);
    // Update a User with useId
    app.put('/users/:userId', users.update);
    //delete user
    app.delete('/users/:userId', users.delete);

    app.post('/signin', function (req, res, next) {
        passport.authenticate('login', function (err, user) {
            if (err) {
             // handle youself
            }
            if (!user) {
                return res.status(500).send({message: "username or password error"});
            }
            req.login(user, function (err) {
                if (err) {
                    return next(err)
                }
                console.log(req.session);
                console.log(req.user);
    
                return res.send({message: "signing successfully"})
            })
    
        })(req, res, next)
    });
};