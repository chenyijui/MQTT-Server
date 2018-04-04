const Thing = require("../module/module.thing");
const Device = require("../module/module.device");

//authenticate username & password
exports.Authenticate = function(client, username, password, callback){
    var ispassed = false;
    var thingid = username.toString().split(':')[0];
    console.log('thingid:' + thingid);
    var thingkey = password.toString().split(':')[0];
    var deviceid = username.toString().split(':')[1];
    console.log('deviceid:' + deviceid);
    var devicekey = password.toString().split(':')[1];
    Thing.findOne({'thingid':thingid,'thingkey':thingkey}, function(err, thing) {
        if(err){
            //do something
            console.log(err);
            console.log(thing);
            return
        }
        else {
            Device.findOne({'deviceid':deviceid, 'devicekey':devicekey}, function(err, device){
                if(err){
                    console.log(err);
                    return
                }else {
                    console.log('find device ' + device);
                    if(device){ 
                        ispassed = true; 
                        console.log('authuser-------------' + ispassed);
                        client.user = username;
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
