import React, { useState, useEffect } from 'react';

import { Container, Col, Row, Form, Button, Card, CardColumns, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
// import { QUERY_ME, QUERY_EVENTS } from '../utils/queries';
import { QUERY_ME } from '../utils/queries';
import { ADD_EVENT, REMOVE_EVENT } from '../utils/mutations';
import { getSavedEventIds, saveEventIds, removeEventId } from '../utils/localStorage';
import { getNumDays, getFirstWeekDay, getDayName, getMonthName, getMonthStart, getMonthEnd, getWeekStart, getWeekEnd, getDayStart, getDayEnd, getNextMonth, getPrevMonth, getNextWeek, getPrevWeek, getNextDay, getPrevDay } from '../utils/dateFormat';
import { DayBox } from '../components/DayBox';


import Auth from '../utils/auth';
import events from 'inquirer/lib/utils/events';

const MyDay = () => {
    const [ showModal, setShowModal ] = useState(false);
    const { currTime } = useParams();
    const { loading, data } = useQuery(QUERY_ME);

    console.log("----- currTime ----- MyDay.js");
    console.log(currTime);

    const [addEvent, { error }] = useMutation(ADD_EVENT);

    let userData = {};
    let myEvents = {};
    let todayEvents = {};

    //const [removeEvent, { error }] = useMutation(REMOVE_EVENT);
    if ( data ) {
        userData = data.me;
        myEvents = userData.events;
    } else {
        userData = {};
    }


    const myDate = new Date(currTime);
    console.log("----- myDate ----- MyDay.js");
    console.log(myDate);
    const month = myDate.getMonth();
    console.log("----- month ----- MyDay.js");
    console.log(month);
    const year = myDate.getFullYear();
    console.log("----- year ----- MyDay.js");
    console.log(year);
    const day = myDate.getDate();
    console.log("----- day ----- MyDay.js");
    console.log(day);
    const dayName = getDayName(myDate.getDay());
    console.log("----- dayName ----- MyDay.js");
    console.log(dayName);
    const monthName = getMonthName(month);
    console.log("----- monthName ----- MyDay.js");
    console.log(monthName);


    for (let i = 0; i < myEvents.length; i++) {
        const currEventDate = new Date(myEvents[i].eventDate);

        if (currEventDate.getDate() === day && currEventDate.getMonth() === month && currEventDate.getFullYear() === year) {
            todayEvents.push(myEvents[i]);
        }
    }

    // const handleDeleteEvent = async (eventId) => {
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;

    //     if (!token) {
    //         return false;
    //     }

    //     try {
    //         const { data } = await removeEvent({
    //             variables: { eventId },
    //         });

    //         removeEventId(eventId);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    //const currDate = new Date();

    return (
        <div>
            <div fluid className="jumbotron text-light bg-dark">
                <Container>
                    <h1>{userData.firstName}'s Day</h1>
                    <h2>{dayName}, {monthName} {day},{year}</h2>
                </Container>
            </div>
            <Container>
                <h2>

                </h2>
            </Container>
            
        </div>
    );
};

export default MyDay;