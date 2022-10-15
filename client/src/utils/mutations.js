import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
        addUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_EVENT = gql`
    mutation addEvent($eventUser: String!, $eventDate: String!, $eventTitle: String!, $eventDescription: String!) {
        addEvent(eventUser: $eventUser, eventDate: $eventDate, eventDescription: $eventDescription) {
            _id
            username
            email
            events {
                eventId
                eventUser
                eventDate
                eventTitle
                eventDescription
            }
        }
    } 
`;

export const REMOVE_EVENT = gql`
    mutation removeEvent($eventId: ID!) {
        removeEvent(eventId: $eventId) {
            _id
            username
            email
            events {
                eventId
                eventUser
                eventDate
                eventTitle
                eventDescription
            }
        }
    }
`;