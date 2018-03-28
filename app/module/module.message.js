const mongoose = require('mongoose');

var messageschema = new mongoose.Schema({
    topic: String,
    payload: String,
    retain: String,
    qos: String,
    date: Date
});

const Message = mongoose.model('Message', messageschema);
module.exports = Message;