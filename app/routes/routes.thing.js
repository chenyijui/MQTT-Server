module.exports = function(app) {
    const things = require('../controller/controller.thing');
    //creat a thing username and password
    app.post('/things', things.creat);
    //find all thing with thingId
    app.get('/things', things.findAll);
    //find one thing with thingId
    app.get('/things/:thingId', things.findOne);
    //delete thing with thingId
    app.delete('/things/:thingId', things.delete);
    //update thing
    app.put('/things/:thingId', things.update);
}