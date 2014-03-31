'use strict';
/**
 *  Mean container for dependency injection
 */
var mean = require('meanio');
mean.app('Mean Demo App',{});

/**
 * Module dependencies.
 */
var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    logger = require('mean-logger');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./server/config/config');
var db = mongoose.connect(config.db);

// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./server/config/system/bootstrap')(passport, db);

// Start the app by listening on <port>
//app.listen(port);
var io = require('socket.io').listen(app.listen(config.port));
console.log('Express app started on port ' + config.port);

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

    if (socket.handshake.signedCookies)
    {
        socket.emit('thumperQueue', socket.handshake.signedCookies['connect.sid']);
    }
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
            io.sockets.emit('thumperInfo', 'Queue Length: ' + queues.length);

            if (!queues || !Array.isArray(queues) || queues.length === 0)
            {
                return;
            }
            else if (queues.length >= 2)
            {
                if (!queues[0].expire_time)
                {
                    queues[0].expire_time = new Date(Date.now() + 1 * 60000);
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
                io.sockets.emit(queues[0].session_id, 'Your Position: N/A');
                queues[0].remove();

                var i;
                for (i = 1; i < queues.length; i++)
                {
                    io.sockets.emit(queues[i].session_id, 'Your Position: ' + i);
                }

            }

        });

}, 1000);
