'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    passport = require('passport'),
    logger = require('mean-logger');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables 
var config = require('./config/config'),
    mongoose = require('mongoose');

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

// Bootstrap passport config
require('./config/passport')(passport);

var app = express();

// Express settings
require('./config/express')(app, passport, db);

// Bootstrap routes
var routes_path = __dirname + '/app/routes';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath)(app, passport);
            }
        // We skip the app/routes/middlewares directory as it is meant to be
        // used and shared by routes as further middlewares and is not a 
        // route by itself
        } else if (stat.isDirectory() && file !== 'middlewares') {
            walk(newPath);
        }
    });
};
walk(routes_path);


// Start the app by listening on <port>
// var port = process.env.PORT || config.port;
var port = 80;
//app.listen(port);
var io = require('socket.io').listen(app.listen(port));
console.log('Express app started on port ' + port);

var parseCookie = express.cookieParser('MEAN');

io.configure(function() {
    io.set('authorization', function(handshake, callback) {
        if(handshake.headers.cookie){
            parseCookie(handshake, null, function(err) {
                if (err) return;
            });

        }

        callback(null, true);
    });

});

// Socket.IO functions
function relayToLynx(a) {
    console.log('Received command from client to Lynx: ' + a);
    io.sockets.emit('serverToLynx', a);
}

function relayToThumper(a) {
    console.log('Received command from client to Thumper: ' + a);
    io.sockets.emit('serverToThumper', a);
}

function relayThumperToClient(a) {
    console.log('Received speed from Thumper to client: ' + a);
    io.sockets.emit('thumperToClient', a);
}

function relayLynxToClient(a) {
    console.log('Received speed from Lynx to client: ' + a);
    io.sockets.emit('lynxToClient', a);
}

// Socket.IO actions on connection
io.sockets.on('connection', function(socket) {
    socket.emit('hello', { message: 'Hello!' });
    socket.on('clientType', console.log);
    socket.on('clientToLynx', relayToLynx);
    socket.on('clientToThumper', relayToThumper);
    socket.on('thumperToServer', relayThumperToClient);
    socket.on('lynxToServer', relayLynxToClient);
    socket.emit('thumperQueue', socket.handshake.signedCookies['connect.sid']);
});

// Initializing logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;

// Poll database
var Queue = mongoose.model('Queue');

setInterval(function() {
    Queue
        .find({}, {}, { sort: { 'created': 1 } })
        .exec(function (err, queues) {
            if (!queues || !Array.isArray(queues) || queues.length === 0)
            {
                return;
            }
            else if (queues.length >= 2)
            {
                if (!queues[0].expire_time)
                {
                    queues[0].expire_time = new Date(Date.now() + 1 * 60000 / 6);
                    queues[0].save();
                }

            }

            if (!queues[0].expire_time || queues[0].expire_time >= Date.now())
            {
                io.sockets.emit(queues[0].session_id, 'Go');
            }
            else if (queues[0].expire_time < Date.now())
            {
                io.sockets.emit(queues[0].session_id, 'Stop');
                queues[0].remove();
            }

        });

}, 1000);
