const Device = require('../module/module.device');
const md5 = require('md5');
const keys = require('../../config/key');

exports.creat = function(req, res){
    if(!req.body.devicename || !req.body.devicetype || !req.body.devicepw ){
        res.status(500).send({message:'Deviceid can not be empty'});
    } else {
        var d = new Date();
        var n = d.toISOString();
        console.log(req.body.devicename);
        var deviceId = req.body.devicename + req.body.devicetype +req.body.devicepw+ n + 'device';
        var deviceId_Encrypt = md5(deviceId);
        var devicekey = deviceId_Encrypt + keys.secret.secretkey;
        var devicekey_Encrypt = md5(devicekey);
        var device = new Device({
            devicename:req.body.devicename,
            devicepw:  md5(req.body.devicepw),
            devicetype: req.body.devicetype,
            deviceid: deviceId_Encrypt,
            devicekey: devicekey_Encrypt,
        })
        device.save(function(err, device){
            if(err){
                res.status(500).send({message:'some error'});
            }
            res.status(200).send(device);
        })
    }
};

exports.findAll = function(req, res){
    Device.find(function(err, device){
        if(err){
            res.status(500).send({message: 'some error'});
        }
        res.status(200).send(device);
    })
}

exports.findOne = function(req, res){
    Device.findById(req.params.deviceId, function(err, device){
        if(err){
            res.status(500).send({message:'some error'});
        }else {
            res.status(200).send(device);
        }
    })
}

exports.delete = function(req, res){
    Device.remove({_id:req.params.deviceId}, function(err, device){
        if(err){
            res.status(500).send({message: 'some error'});
        }
        res.status(200).send({message: 'success remove'});
    });
}

exports.update = function(req, res){
    Device.findById(req.params.deviceId, function(err ,device){
        if(err){
            res.status(500).send({message: 'some error'});
        }
        device.devicetype = req.body.devicetype || device.devicetype;
        device.deviceid = req.body.deviceid || device.deviceid;
        device.devicekey = req.body.devicekey || device.devicekey;
        device.save(function(err, deviceId){
            res.status(200).send(device);
        });
    });
}