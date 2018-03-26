const mosca = require('mosca');
const mongoUrl = 'mongodb://localhost:27017/mqtt';
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
        url: 'mongodb://localhost:27017/mqtt'
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
    //fired when a message is received
    server.on('published', (packet, client) => {
        console.log('Published', packet);
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