import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            events {
                _id
                eventUser
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
//             _id
//             eventUser
//             eventDate
//             eventTitle
//             eventDescription
//         }
//     }
// `;