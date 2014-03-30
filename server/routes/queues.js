'use strict';

// Foos routes use foos controller
var queues = require('../controllers/queues');

module.exports = function(app) {
    app.post('/queues', queues.create);
};