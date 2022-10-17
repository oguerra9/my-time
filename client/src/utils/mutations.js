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

// export const ADD_EVENT = gql`
//     mutation addEvent($eventDate: String!, $eventTitle: String!, $eventDescription: String!) {
//         addEvent(eventDate: $eventDate, eventDescription: $eventDescription) {
//             _id
//             username
//             email
//             events {
//                 eventId
//                 eventDate
//                 eventTitle
//                 eventDescription
//             }
//         }
//     } 
// `;

export const ADD_EVENT = gql`
    mutation addEvent($eventData: EventInput!) {
        addEvent(eventData: $eventData) {
            _id
            firstName
            lastName
            username
            email
            events {
                eventId
                eventDate
                eventTitle
                eventDescription
            }
        }
    } 
`;

/*

export const ADD_EVENT = gql`
    mutation addEvent($eventId: String!, $eventDate: String, $eventTitle: String!, eventDescription: String) {
        addEvent(eventId: $eventId, eventDate: $eventDate, eventTitle: $eventTitle, eventDescription: $eventDescription) {
            _id
            firstName
            lastName
            username
            email
            events {
                eventId
                eventDate
                eventTitle
                eventDescription
            }
        }
    } 
`;
*/

// export const REMOVE_EVENT = gql`
//     mutation removeEvent($eventId: ID!) {
//         removeEvent(eventId: $eventId) {
//             _id
//             username
//             email
//             events {
//                 eventId
//                 eventDate
//                 eventTitle
//                 eventDescription
//             }
//         }
//     }
// `;