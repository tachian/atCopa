// web.js
// var express = require("express");
// var logfmt = require("logfmt");
// var app = express();
// var path = require('path');

// app.set('views', __dirname);

// app.use(logfmt.requestLogger());

// app.use(express.static(path.join(__dirname, '../dist')));
// app.use('/fonts', express.static(__dirname + '/fonts'));
// app.use('/images', express.static(__dirname + '/images'));
// app.use('/scripts', express.static(__dirname + '/scripts'));
// app.use('/styles', express.static(__dirname + '/styles'));
// app.use('/views', express.static(__dirname + '/views'));

// app.engine('html', require('ejs').renderFile);

// app.get('*', function(req, res){
//   res.render('index.html')
// });

// var port = Number(process.env.PORT || 5000);
// app.listen(port, function() {
//   console.log("Listening on " + port);
// });

var express = require('express');
var http = require('http');
var gzippo = require('gzippo');
var app = express();
app.use(express.logger());
app.use(gzippo.staticGzip('' + __dirname));
var server = http.createServer(app);
server.listen(process.env.PORT || 5000);