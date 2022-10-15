const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        username: String
        email: String
        password: String
        events: [Event]!
    }

    type Event {
        _id: ID
        eventUser: String
        eventDate: Date
        eventTitle: String
        eventDescription: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        event(eventId: ID!): Event
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addEvent(eventUser: String!, eventDate: Date!, eventTitle: String!, eventDescription: String!): Event
        removeEvent(eventId: ID!): Event
    }
`;

module.exports = typeDefs;