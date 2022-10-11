import React, { useState, useEffect } from 'react';

import {
    Jumbotron,
    Container,
    Col,
    Form, 
    Button,
    Card,
    CardColumns,
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_EVENTS } from '../utils/queries';
import { ADD_EVENT, REMOVE_EVENT } from '../utils/mutations';
import { getSavedEventIds, saveEventIds, removeEventId } from '../utils/localStorage';

import Auth from '../utils/auth';

const MyEvents = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const [addEvent, { error }] = useMutation(ADD_EVENT);
    const [removeEvent, { err }] = useMutation(REMOVE_EVENT);

    const userData = data?.me || {};

    const handleDeleteEvent = async (eventId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeEvent({
                variables: { eventId },
            });

            removeEventId(eventId);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    const currDate = new Date();


    return (
        <div>
            <Jumbotron fluid className="text-light bg-dark">
                <Container>
                    <h1>{userData.firstName}'s Day</h1>
                    <h2></h2>
                </Container>
            </Jumbotron>
            <Container>
                <h2>

                </h2>
            </Container>
        </div>
    );
};