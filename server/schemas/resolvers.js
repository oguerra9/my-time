const { AuthenticationError } = require('apollo-server-express');
const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                console.log('----- context.user found ----- server/schemas/resolvers');
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

                console.log(userData);
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        // event: async (parent, { eventId }) => {
        //     return Event.findOne({ _id: eventId });
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
        addEvent: async (parent, { eventUser, eventDate, eventTitle, eventDescription }) => {
            const event = await Event.create({ eventUser, eventDate, eventTitle, eventDescription });

            await Event.findOneAndUpdate(
                { username: eventUser },
                { $addToSet: { event } }
            );
        },
        removeEvent: async (parent, { eventId }) => {
            return Event.findOneAndDelete({ _id: eventId });
        },
    },
};

module.exports = resolvers;