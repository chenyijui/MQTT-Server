const mongoose =  require('mongoose');

var userschema = new mongoose.Schema ({
    role: String,
    name: String,
    email: String,
    username:String,
    password:String,
    things:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Thing'
    }],
    devices:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Device'
    }],
    view:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Thing'
    }]
},{timestamps:true, usePushEach:true});

const User = mongoose.model('User', userschema);
module.exports = User;