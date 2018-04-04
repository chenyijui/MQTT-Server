const Device = require('../module/module.device');
const md5 = require('md5');
const keys = require('../../config/key');

exports.creat = function(req, res){
    if(!req.body.devicename || !req.body.devicetype){
        res.status(500).send({message:'Deviceid can not be empty'});
    } else {
        var d = new Date();
        var n = d.toISOString();
        console.log(req.body.devicename);
        var newDeviceId = req.body.devicename + n + 'device';
        var deviceIdEncrypt = md5(newDeviceId);
        var newDeviceKey = deviceIdEncrypt + keys.secret.secretkey;
        var devicekeyEncrypt = md5(newDeviceKey);
        var device = new Device({
            devicename:req.body.devicename,
            devicetype: req.body.devicetype,
            deviceid: deviceIdEncrypt,
            devicekey: devicekeyEncrypt,
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