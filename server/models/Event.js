const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema({
    eventUser: {
        type: String,
        required: true,
        trim: true,
    },
    eventDate: {
        type: Date,
        get: (timestamp) => dateFormat(timestamp),
    },
    eventTime: {
        type: Date,
        get: (timestamp) => dateFormat(timestamp),
    },
    eventTitle: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        trim: true,
    },
    eventDescription: {
        type: String,
    },
});

const Event = model('Event', eventSchema);

module.exports = Event;