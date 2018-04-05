const Thing = require("../module/module.thing");
const Device = require("../module/module.device");

//authenticate username & password
exports.Authenticate = function(client, connect_username, connect_password, callback){
    var ispassed = false;
    var thingId = connect_username.toString().split(':')[0];
    console.log('thingId:' + thingId);
    var thingKey = connect_password.toString().split(':')[0];
    var deviceId = connect_username.toString().split(':')[1];
    console.log('deviceid:' + deviceId);
    var deviceKey = connect_password.toString().split(':')[1];
    Thing.findOne({'thingid':thingId,'thingkey':thingKey}, function(err, thing) {
        if(err){
            //do something
            console.log(err);
            console.log(thing);
            return
        }
        else {
            Device.findOne({'deviceid':deviceId, 'devicekey':deviceKey}, function(err, device){
                if(err){
                    console.log(err);
                    return
                }else {
                    console.log('find device ' + device);
                    if(device){ 
                        ispassed = true; 
                        console.log('authuser-------------' + ispassed);
                        client.user = connect_username;
                        console.log('authuser-------------' + client.user);
                    }
                }
                console.log('callback(null,ispassed)-------------------------------'+ispassed);
                callback(null,ispassed); 
            });
        }
    });
    console.log("=== FUNCTION:Authenticate.authuser ENDDDDDDDDDDDDDDDDDDDD ===")
} 
