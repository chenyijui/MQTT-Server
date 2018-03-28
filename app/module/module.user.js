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
    device:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Device'
    }]
},{timestamps:true, usePushEach:true});

const User = mongoose.model('User', userschema);
module.exports = User;