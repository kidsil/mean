'use strict';

// Foos routes use foos controller
var follows = require('../controllers/follows');

module.exports = function(app) {
    app.post('/follows', follows.create);
};