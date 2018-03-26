const express = require('express');
const mqttsv = require('./mqttsv.js').getServer();
const app = express();
const http = require('http');
const srv = http.createServer(app);
// mqttsv.attachHttpServer(srv);

app.listen(3000, function(){
    console.log("httpserver running with 3000 port");
});




