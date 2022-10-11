import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            events {
                eventId
                eventUser
                eventDate
                eventTime
                eventTitle
                eventDescription
            }
        }
    }
`;

export const QUERY_EVENTS = gql`
    query getMyEvents($eventUser: Username!) {
        events(eventUser: $eventUser) {
            _id
            eventUser
            eventDate
            eventTime
            eventTitle
            eventDescription
        }
    }
`;