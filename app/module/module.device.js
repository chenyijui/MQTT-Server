const mongoose = require('mongoose');

var devieschema = new mongoose.Schema({
    devicename: String,
    devicetype: String,
    deviceid: String,
    devicekey: String,
},{timestamps:true, usePushEach:true});

const Device = mongoose.model('Device', devieschema); 
module.exports = Device;