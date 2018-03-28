module.exports = function(app){
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
};