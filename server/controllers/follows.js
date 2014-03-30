'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Follow = mongoose.model('Follow');

/**
 * Create an article
 */
exports.create = function(req, res) {
    var follow = new Follow(req.body);

    follow.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                follow: follow
            });
        } else {
            res.jsonp(follow);
        }
    });
};