const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
//use authenticate passport
const passport = require('passport');
const passportSetup = require('./app/controller/authenticat.user.strategy');
const LocalStrategy = require('passport-local').Strategy
const mqttsv = require('./mqttsv.js').getServer();
const keys = require('./config/key');
// Configuring the database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mqtt');
//creat express app
const app = express();
const http = require('http');
const srv = http.createServer(app);
// mqttsv.attachHttpServer(srv);

//passport init & passport session
app.use(passport.initialize())
app.use(passport.session())


//setting session
app.use(cookieSession({
	name:'session',
	keys:[keys.secret.sessionkey],
	maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors({
	methods: ['GET', 'POST', 'PATCH','DELETE', 'PUT'],
	credentials: true,
	origin: true
}));
// Require User routes
require('./app/routes/routes.user')(app);
require('./app/routes/routes.thing')(app);
require('./app/routes/routes.device')(app);


app.get('/', (req, res) => res.send({message:'hello'}))

app.listen(3000, function(){
    console.log("httpserver running with 3000 port");
});




