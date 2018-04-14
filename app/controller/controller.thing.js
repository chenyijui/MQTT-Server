const Thing = require('../module/module.thing');
const mongoose = require('mongoose');
const keys = require('../../config/key');
const md5 = require('md5');
const User = require('../module/module.user');

//creat a new thing
exports.creat = function(req, res) {
    if(!req.body.thingname || !req.body.thingtype) {
        res.status(500).send({message:'ThingId&Thingname can not be empty'});
    } else {
        var d = new Date();
        var n = d.toISOString();
        var thingId = req.session.passport.user + n + 'thing';
        var thingId_Encrypt = md5(thingId);
        var thingKey = thingId_Encrypt + keys.secret.secretkey;
        var thingkey_Encrypt = md5(thingKey);
        var thing = new Thing({
            _id: new mongoose.Types.ObjectId(),
            thingname: req.body.thingname,
            thingtype:req.body.thingtype,
            thingid: thingId_Encrypt,
            thingkey: thingkey_Encrypt,
        });
        console.log(thing);
        User.findById({_id: req.session.passport.user}, function(err, user){
            if(err) {
                res.status(404).send({message:'can not find user by UserId'});
            }
            if(user.things.indexOf(thing._id)==-1) {
                user.things.push(thing._id);   
            }
            thing.save(function(err, thing){
                if(err) {
                    res.status(500).send({message: 'some error'})
                }
                user.save(function(err){
                    if(err) {
                        res.status(500).send({message: 'some error'})
                    }else {
                        res.status(200).send(thing);
                    }
                })
            });
        });   
    }
};

exports.findAll = function(req, res) {
    Thing.find(function(err, thing) {
        if(err) {
            res.status(500).send({message:'some error'});
        }else {

            res.status(200).send(thing);
        }
    });
}

exports.findUserAllThing = function(req, res) {
    User.findById({_id: req.session.passport.user})
    .populate('things')
    .exec(function(err, user){
        if(err) {
            console.log(user);
            res.status(500).send({message: 'some error'});
            if(user === undefined ) {
                res.status(404).send({message: 'can not find user things'});
            }
        } else {
            res.send(user.things);
        }
    });
}

exports.findOne = function(req, res) {
    Thing.findById(req.params.thingId,function(err, thing){
        if(err) {
            res.status(500).send({message:'some error'})
        }else {
            res.status(200).send(thing);
        }
    })
}

exports.update = function(req, res) {
    Thing.findById(req.params.thingId, function(err ,thing){
        if(err) {
            res.status(403).send({message:'some error'});
        } else {
            var d = new Date();
            var n = d.toISOString();
            var thingId = req.session.passport.user + n + 'thing';
            var thingId_Encrypt = md5(thingId);
            var thingKey = thingId_Encrypt + keys.secret.secretkey;
            var thingkey_Encrypt = md5(thingKey);
            thing.thingname = req.body.thingname;
            thing.thingtype =req.body.thingtype;            
            thing.thingid = thingId_Encrypt;
            thing.thingkey = thingkey_Encrypt;
            console.log(thing);
            thing.save(function(err, thing){
                res.status(200).send(thing);
            })
        }
    })
}

exports.delete = function(req, res) {
    Thing.remove({_id:req.params.thingId}, function(err, thing){
        if(err) {
            res.status(500).send({message:"can not remove"})
        }else {
            res.status(200).send({message: 'success remove'});
        }
    });
}