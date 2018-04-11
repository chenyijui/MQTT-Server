module.exports = function(app) {
    const devices = require('../controller/controller.device');
    const authentication = require('../controller/authenticationMiddleware');
    //creat a new device
    app.post('/devices', authentication.authenticationMiddleware, devices.creat);
    //find all devices with deviceid
    app.get('/devices', devices.findAll);
    //find one device with deviceid
    app.get('/devices/:deviceId', devices.findOne);
    //upade a device with deviceid
    app.put('/devices/:deviceId', devices.update);
    //delete a dcvice with deviceid
    app.delete('/devices/:deviceId', devices.delete);
    //find all devices with userId
    app.get('/info/devices', authentication.authenticationMiddleware, devices.findUserAllDevice);
}