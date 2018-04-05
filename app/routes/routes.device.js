module.exports = function(app) {
    const devices = require('../controller/controller.device');
    //creat a new device
    app.post('/devices', devices.creat);
    //find all devices with deviceid
    app.get('/devices', devices.findAll);
    //find one device with deviceid
    app.get('/devices/:deviceId', devices.findOne);
    //upade a device with deviceid
    app.put('/devices/:deviceId', devices.update);
    //delete a dcvice with deviceid
    app.delete('/devices/:deviceId', devices.delete);
}