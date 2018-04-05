const Thing = require('../module/module.thing');
const keys = require('../../config/key');
const md5 = require('md5');


//creat a new thing
exports.creat = function(req, res){

    if(!req.body.thingname){
        res.status(500).send({message:'ThingId&Thingname can not be empty'});
    } else{
        var d = new Date();
        var n = d.toISOString();
        var thingId = req.body.thingname + n + 'thing';
        var thingId_Encrypt = md5(thingId);
        var thingKey = thingId_Encrypt + keys.secret.secretkey;
        var thingkey_Encrypt = md5(thingKey);
        var thing = new Thing({
            thingname: req.body.thingname,
            thingid: thingId_Encrypt,
            thingkey: thingkey_Encrypt,
        });
        console.log(thing);
        thing.save(function(err, thing){
            if(err){
                res.status(500).send({message: 'some error'})
            }else {
                res.status(200).send(thing);
            }
        });
    }
};

exports.findAll = function(req ,res){
    Thing.find(function(err, thing){
        if(err){
            res.status(500).send({message:'some error'});
        }else {

            res.status(200).send(thing);
        }
    });
}

exports.findOne = function(req, res){
    Thing.findById(req.params.thingId,function(err, thing){
        if(err){
            res.status(500).send({message:'some error'})
        }else {
            res.status(200).send(thing);
        }
    })
}

exports.update = function(req, res){
    Thing.findById(req.params.thingId, function(err ,thing){
        if(err){
            res.status(500).send({message:'some error'});
        }else {
            console.log(req.body.thingid);
            thing.thingid = req.body.thingid;
            thing.thingkey = req.body.thingkey ||thing.thingkey;
            console.log(thing);
            thing.save(function(err, thing){
                res.status(200).send(thing);
            })
        }
    })
}
    
exports.delete = function(req, res){
    Thing.remove({_id:req.params.thingId}, function(err, thing){
        if(err){
            res.status(500).send({message:"can not remove"})
        }else {
            res.status(200).send({message: 'success remove'});
        }
    });
}