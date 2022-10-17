const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                console.log('----- context.user found ----- server/schemas/resolvers');
                let userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

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
        addEvent: async (parent, { eventData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { events: eventData } },
                    { new: true }
                );
                return updatedUser;
            }

            throw new AuthenticationError('You need to be loggged in!');
        },
        // removeEvent: async (parent, { eventId }, context) => {
        //     if (context.user) {
        //         const updatedUser = await User.findOneAndUpdate(
        //             { _id: context.user._id },
        //             { $pull: { events: { eventId } } },
        //             { new: true }
        //         );

        //         return updatedUser;
        //     }

        //     throw new AuthenticationError('You need to be logged in!');
        // },
    },
};

module.exports = resolvers;