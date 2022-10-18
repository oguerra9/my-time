const { Schema } = require('mongoose');

const eventSchema = new Schema({
    eventId: {
        type: String,
        trim: true,
    },
    eventDate: {
        type: String,
        trim: true,
    },
    eventTitle: {
        type: String,
        trim: true,
    },
    eventDescription: {
        type: String,
        trim: true,
    },
});

module.exports = eventSchema;

// const { Schema } = require('mongoose');

// const eventSchema = new Schema({
//     eventId: {
//         type: String, 
//         required: true,
//     },
//     eventDate: {
//         type: String,
//         trim: true, 
//         default: '0',   
//     },
//     eventTitle: {
//         type: String,
//         required: true,
//         minlength: 1,
//         maxlength: 100,
//         trim: true,
//     },
//     eventDescription: {
//         type: String,
//         trim: true,
//     },
// });

// module.exports = eventSchema;




// // const { Schema, model } = require('mongoose');
// // //const dateFormat = require('../utils/dateFormat');

// // const eventSchema = new Schema({
// //     eventDate: {
// //         type: String,
// //         trim: true,
// //         default: "0",
// //     },
// //     eventTitle: {
// //         type: String,
// //         required: true,
// //         minlength: 1,
// //         maxlength: 100,
// //         trim: true,
// //     },
// //     eventDescription: {
// //         type: String,
// //         trim: true,
// //     },
// // });

// // //const Event = model('Event', eventSchema);

// // //module.exports = { Event };
// // //module.exports = { eventSchema, Event };
// // module.exports = { eventSchema };