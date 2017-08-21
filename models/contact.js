'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    image: {
        type: String,
        required: true,
        trim: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 30
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        maxlength: 60
    },
    user: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Contact', schema);