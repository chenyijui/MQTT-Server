const mongoose = require('mongoose');
var thingschema = new mongoose.Schema({
    thingid: String,
    thingkey: String,
},{timestamps:true, usePushEach:true});

const Thing = mongoose.model('Thing', thingschema);
module.exports = Thing;