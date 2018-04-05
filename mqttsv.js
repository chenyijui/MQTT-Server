const mosca = require('mosca');
const mongoose = require('mongoose');
const Message = require('./app/module/module.message');
const authuser = require('../server/app/controller/mqttsv.controller.authuser');
//Mongoose configurations
mongoose.connect('mongodb://localhost:27017/mqtt');
mongoose.Promise = global.Promise;
const mongoUrl = 'mongodb://localhost:27017/mqtt';
//Mosca setting
const moscaSettings = {
    port: 1883,
    backend: {
        type: 'mongo',
        url: mongoUrl,
        pubsubCollection: 'moscadata',
        mongo: {}
    },
    persistence: {
        factory: mosca.persistence.Mongo,
        url: 'mongodb://localhost:27017/mqtt',
        ttl: {
            subscriptions: 1000 * 60 * 10,
            packets: 1000 * 60 * 10
        }
    }
}
var server;


var Mqttsv = function() {
    var a ;
    server = new mosca.Server(moscaSettings);
    var authenticate = function(client, connect_username, connect_password, callback) {
        var authorized = authuser.Authenticate(client, connect_username, connect_password , callback);
    }
    var authorizePublish = function (client, topic, payload, callback) {
        console.log("==========authorizePublish=============" + topic.split('/')[0]); 
        if(client.user != topic.split('/')[0]){
            console.log('==========authorizePublish============='+ topic.split('/')[0] + '  ' + 'can not publish');
        }
        callback(null, client.user == topic.split('/')[0]);
        // set auth to :
        //  true to allow 
        //  false to deny and disconnect
        //  'ignore' to puback but not publish msg.
        // callback(null, auth);
    }
    
    var authorizeSubscribe = function (client, topic, callback) {
        var auth = true;
        // set auth to :
        //  true to allow
        //  false to deny 
        callback(null, auth);
    }
    server.on('ready', (setup) => {
        server.authenticate = authenticate;
        server.authorizePublish = authorizePublish;
        server.authorizeSubscribe = authorizeSubscribe;
    });
    server.on('clientConnected', (client) => {
        console.log('client connected', client.id);
    });
    server.on("error", (err) => {
        console.log(err);
    });
    server.on('subscribed', (topic, client) => {
        console.log('subscribed : ', topic);
    });
    server.on('unsubscribed', (topic, client) => {
        console.log('unsubscribed : ', topic);
    });
    // server.published = function(packet, client, cb) {
    //     if(packet.topic.indexOf('echo') === 0) {
    //         return cb();
    //     }
    //     var newPacket = {
    //         topic: 'echo/' + packet.topic,
    //         payload: packet.payload,
    //         retain: packet.retain,
    //         qos: packet.qos
    //     };
    //     server.publish(newPacket, cb);
    //     console.log('publish', newPacket);
    // };

    //fired when a message is received
    server.on('published', (packet, client) => {
        if(!packet.topic.includes('$SYS')) {
            var messagejson = packet.payload.toString('utf-8');
            var message = new Message({
                topic: 'echo/' + packet.topic,
                payload: packet.payload,
                retain: packet.retain,
                qos: packet.qos,
                date: new Date()
            })
            console.log('Published', messagejson);
            console.log('message', message);
            message.save();
        }
    });
    // when client return puback,
    server.on('delivered', (packet, client) => {
        console.log('Delivered', packet);
    });
}
/*
 * Module exports
 */
module.exports = new Mqttsv();

Mqttsv.prototype.getServer = function(){
    return server;
};
function setup() {
    console.log('Mosca server is up and running')
};