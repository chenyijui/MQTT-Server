module.exports = function(app) {
    const authentication = require('../controller/authenticationMiddleware');
    const users = require('../controller/controller.user');
    //creat a new user
    app.post('/users', users.creat);
    //find all user
    // app.get('/users', authentication.authenticationMiddleware, users.findAll);
    //find one user
    app.get('/info', authentication.authenticationMiddleware, users.findOne);
    // Update a User with useId
    app.put('/info', authentication.authenticationMiddleware, users.update);
    //delete user
    app.delete('/users/:userId', users.delete);
    //user logout
    app.get('/signout',(req, res, ) => {
        //handle with passport
        req.logout();
        console.log('=======/signout=====')
        console.log(req.session);
        if(req.session){
            req.session = null;
        } else {
            // req.session.destroy();
            res.send({message: "can not logout"});
        }
        res.send({message: "success logout"});
    });
};