'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Entry Schema
 */
var FollowSchema = new Schema({
	created: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String
    }
});

/**
 * Validations
 */
FollowSchema.path('email').validate(function(title) {
    return title.length;
}, 'Email cannot be blank');

mongoose.model('Follow', FollowSchema);
