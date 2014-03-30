'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Entry Schema
 */
var QueueSchema = new Schema({
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    expire_time: {
        type: Date
    },
    session_id: {
        type: String,
        unique: true,
        required: true
    }
});

mongoose.model('Queue', QueueSchema);
