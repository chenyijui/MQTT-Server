module.exports = function(app) {
    const things = require('../controller/controller.thing');
    const authentication = require('../controller/authenticationMiddleware');
    //creat a thing username and password
    app.post('/things', authentication.authenticationMiddleware, things.creat);
    //find all things
    app.get('/things', things.findAll);
    //find one thing with thingId
    app.get('/things/:thingId', things.findOne);
    //delete thing with thingId
    app.delete('/things/:thingId', things.delete);
    //update thing
    app.put('/things/:thingId', things.update);
    //find all things with userId
    app.get('/info/things', authentication.authenticationMiddleware, things.findUserAllThing);
    //add interest 
    app.get('/things/:thingId/interest', things.handleAddInterest);
}