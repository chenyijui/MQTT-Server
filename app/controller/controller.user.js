const User = require('../module/module.user');

exports.creat = function(req, res){
    //creat user and save user
    if(!req.body.name&&!req.body.username&&!req.body.password){
        res.status(400).send({message:'Users can not be empty'});
    }
    var user = new User({
        role: req.body.role,
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });
    user.save(function(err, user){
        if(err){
            console.log(err);
            res.status(500).send({message:'some error'});
        }else {
            res.send(user);
            console.log(user);
        }
    });
};
//find all user
exports.findAll = function(req, res){
    User.find(function(err, user){
        console.log(user);
        res.send(user);
    });
}


//find a user by userId
exports.findOne = function(req ,res){
    User.findById(req.params.userId, function(err, user){
        if(err){
            res.status(500).send({message: "Could not retrieve user"});
        }
        res.send(user);
    })
};
//update user data
exports.update = function (req ,res){
    User.findById(req.params.userId, function(err ,user){
        if(err){
            res.status(500).send({message: "some error"});
        }
        user.role = req.body.role || user.role;
        user.name = req.body.name ||user.name ;
        user.email = req.body.email || user.email;
        user.username = req.body.username || user.username;
        user.password = req.body.password || user.password;
        console.log(user);
        user.save(function(err,user){
            res.status(200).send(user);
        });
    });
}


//delete a user by userId
exports.delete = function(req, res){
    User.remove({_id:req.params.userId}, function(err, user){
        if(err){
            res.status(500).send({message:"can not remove"})
        }
    })
    res.status(200).send({message: 'success remove'});
}