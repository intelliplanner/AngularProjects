// Include our packages in our main server file
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config/main');
const https = require('https')
const cors = require('cors');
const methodOverride = require('method-override');
const db = require('./config/db.config.js');
const path = require('path')
const rfs = require('rotating-file-stream')
const serveIndex = require('serve-index');
const expressWinston = require('express-winston');
const JSON = require('circular-json');
var winston = require('./config/winston');
var util = require('util')
var mung = require('express-mung');
const session = require('express-session');

// const httpsOptions = {
//   key: fs.readFileSync('./cert/key.pem'),
//   cert: fs.readFileSync('./cert/cert.pem')
// }

console.log('1');
var app = express();

// app.use(mung.json(
//     function transform(body, req, res) {


//     if(req.method == 'POST')
//         winston.log('info', {Date: new Date().toLocaleString(), IP: req.connection.remoteAddress, Message:'API REQUEST RESPONSE LOG',  requestHeaders:JSON.stringify(req.headers),  requestBody:JSON.stringify(req.body),  responseBody:JSON.stringify(body)});

//     if(req.method == 'GET')
//         winston.log('info', {Date: new Date().toLocaleString(), IP: req.connection.remoteAddress, Message:'API REQUEST RESPONSE LOG',  requestHeaders:JSON.stringify(req.headers),  requestBody:JSON.stringify(req.query),  responseBody:JSON.stringify(body)});

//     console.log('mung mung mung',JSON.stringify(body));

//         winston.log('info', {spacer: '--------------------------------------------------------------------------------------------'});
//         body.mungMessage = "I intercepted you!";
//         return body;
//     }
// ));

// CORS Support
app.use(cors());
app.use(require('skipper')());
app.use('/customer', express.static(__dirname + '/customer'));
app.use('/log', express.static(__dirname + '/log'));
app.use('/log', serveIndex(path.join(__dirname, 'log')));
app.use('/lrimages', express.static(__dirname + '/.tmp/uploads/lrimages'));

// var server = app.listen(config.port, function () {
//   console.log('Ready')
// require('./app/routes')(app);

// });
app.use(passport.initialize());

console.log('2');
// Use body-parser to get POST requests for API use
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// app.get('/test', function(req, res, next) {
//     res.json({
//         message: 'Hola! I\'m API one'
//     });
// })


var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

morgan.token('type', function(req, res) { return req.headers['content-type'] })
morgan.token('body', function(req, res) { return JSON.stringify(req['body']) })
morgan.token('query', function(req, res) { return JSON.stringify(req['query']) })


// setup the logger
//app.use(morgan('combined', { stream: winston.stream }));
//app.use(morgan(':date :type :url :response-time :req[header] -Request :method :body :query', { stream: accessLogStream }));

//require('./app/route/customer.route.js')(app);



//app.use(function(err, req, res, next) {
// set locals, only providing error in development
// res.status(500).send('Something broke!')
//});

var server = app.listen(config.port, function() {
    console.log('Ready')
    require('./app/routes')(app);
    console.log("routes")

});


module.exports = server;

//Start the server
console.log('Your server and socket ready on port ' + config.port + '.');