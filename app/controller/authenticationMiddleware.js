exports.authenticationMiddleware = function(req, res, next) {
    console.log("===========authenticationMiddleware==========");
    console.log(req.session);
    if(!req.session.passport) {
        res.send({message: "Please login"});
    }else {
        return next();
    }
};