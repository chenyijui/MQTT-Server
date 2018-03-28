const mosca = require('mosca');
const mongoose = require('mongoose');
const Message = require('./app/module/module.message');
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
var Mqttsv = function(){
    server = new mosca.Server(moscaSettings);
    server.on('ready', setup);
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