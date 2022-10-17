import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
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

// export const QUERY_EVENTS = gql`
//     query getMyEvents($timeStart: Date!, $timeEnd: Date!) {
//         events {
//             eventId
//             eventDate
//             eventTitle
//             eventDescription
//         }
//     }
// `;