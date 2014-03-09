'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Queue = mongoose.model('Queue');

/**
 * Create an article
 */
exports.create = function(req, res) {
    Queue.findOne({
        session_id: req.session.id
    })
    .exec(function(err, queue) {
        if (err) return;
        if (!queue) {
            queue = new Queue();
            queue.session_id = req.session.id;
            queue.expire = new Date(Date.now() + 30 * 60000);

            queue.save(function(err) {
                if (err) {
                    return res.send('users/signup', {
                        errors: err.errors,
                        queue: queue
                    });
                } else {
                    res.jsonp(queue);
                }
            });

            return;
        }

        queue.expire = new Date(Date.now() + 30 * 60000);
        queue.save();
        res.jsonp(queue);
    });
};