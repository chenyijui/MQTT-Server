const mongoose = require('mongoose');

var thingschema = new mongoose.Schema({
    thingname:String,
    thingtype:String,
    thingid: String,
    thingkey: String,
    owner:String,
    description:String,
    interest:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
},{timestamps:true, usePushEach:true});

const Thing = mongoose.model('Thing', thingschema);
module.exports = Thing;
