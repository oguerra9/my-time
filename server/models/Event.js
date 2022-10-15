const { Schema, model } = require('mongoose');
//const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema({
    eventUser: {
        type: String,
        required: true,
        trim: true,
    },
    eventDate: {
        type: String,
        trim:true,
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
        trim: true,
    },
});

//const Event = model('Event', eventSchema);

//module.exports = { Event };
//module.exports = { eventSchema, Event };
module.exports = { eventSchema };