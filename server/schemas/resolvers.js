const { AuthenticationError } = require('apollo-server-express');
const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('events');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('thoughts');
        },
        // events: async (parent, { username }) => {
        //     const params = username ? { username } : {};
        //     return Event.find(params).sort({ eventData: -1 });
        // },
        event: async (parent, { eventId }) => {
            return Event.findOne({ _id: eventId });
        },
        // events: async (parent, { startTime, endTime }) => {
        //     return Event.find({eventTime: { $gt: new Date(startTime), $lt: new Date(endTime)}});
        // },
    },

    Mutation: {
        addUser: async (parent, { firstName, lastName, username, email, password }) => {
            const user = await User.create({ firstName, lastName, username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Email and password do not match');
            }

            const token = signToken(user);

            return { token, user };
        },
        addEvent: async (parent, { eventUser, eventDate, eventTime, eventTitle, eventDescription }) => {
            const event = await Event.create({ eventUser, eventDate, eventTime, eventTitle, eventDescription });

            await Event.findOneAndUpdate(
                { username: eventUser },
                { $addToSet: { events: event._id } }
            );
        },
        removeEvent: async (parent, { eventId }) => {
            return Event.findOneAndDelete({ _id: eventId });
        },
    },
};

module.exports = resolvers;