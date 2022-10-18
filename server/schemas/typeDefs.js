const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
        eventCount: Int
        events: [Event]
    }
    type Event {
        eventId: String
        eventDate: String
        eventTitle: String
        eventDescription: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    type Mutation {
        addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addEvent(eventId: String, eventDate: String, eventTitle: String, eventDescription: String): User
    }
`;

module.exports = typeDefs;