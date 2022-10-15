import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Col, Row, Form, Button, Card, CardColumns, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
// import { QUERY_ME, QUERY_EVENTS } from '../utils/queries';
import { QUERY_ME } from '../utils/queries';
import { ADD_EVENT, REMOVE_EVENT } from '../utils/mutations';
import { getSavedEventIds, saveEventIds, removeEventId } from '../utils/localStorage';
import { getNumDays, getFirstWeekDay, getDayName, getMonthName, getMonthStart, getMonthEnd, getWeekStart, getWeekEnd, getDayStart, getDayEnd, getNextMonth, getPrevMonth, getNextWeek, getPrevWeek, getNextDay, getPrevDay } from '../utils/dateFormat';
import DayBox from '../components/DayBox';
import AddEventForm from '../components/AddEventForm';

import Auth from '../utils/auth';
import events from 'inquirer/lib/utils/events';

const MyDay = () => {
    const [ showModal, setShowModal ] = useState(false);
    const { currTime } = useParams();
    const { loading, data } = useQuery(QUERY_ME);

    let myDate = new Date ();
    myDate.setHours(0);
    myDate.setMinutes(0);
    myDate.setSeconds(0);
    myDate.setMilliseconds(0);

    let myTime = myDate.getTime();

    if (currTime) {
        console.log("----- currTime ----- MyDay.js");
        console.log(currTime);

        myDate = new Date(parseInt(currTime));
        console.log("----- myDate ----- MyDay.js");
        console.log(myDate);
    }     


    const [addEvent, { error }] = useMutation(ADD_EVENT);

    let userData = {};
    let myEvents = {};


    //const [removeEvent, { error }] = useMutation(REMOVE_EVENT);
    if ( data ) {
        console.log("===== user data found =====");
        userData = data.me;
        console.log("----- User Data: -----");
        console.log(userData);
        myEvents = userData.events;
    } else {
        userData = {};
    }

    let month = myDate.getMonth();
    console.log("----- month ----- MyDay.js");
    console.log(month);
    let year = myDate.getFullYear();
    console.log("----- year ----- MyDay.js");
    console.log(year);
    let day = myDate.getDate();
    console.log("----- day ----- MyDay.js");
    console.log(day);
    let dayName = getDayName(myDate.getDay());
    console.log("----- dayName ----- MyDay.js");
    console.log(dayName);
    let monthName = getMonthName(month);
    console.log("----- monthName ----- MyDay.js");
    console.log(monthName);

    let todayEvents = [];

    for (let i = 0; i < myEvents.length; i++) {
        // if eventDate is in milliseconds
        // const currEventDate = new Date(myEvents[i].eventDate);
        // if eventDate is a Date object
        const currEventDate = myEvents[i].eventDate;

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
    const prevDay = (event) => {
        event.preventDefault();
        console.log('prevDay button clicked');
        myDate.setDate(day--);
        const timeParam = myDate.getTime();
        return <Navigate to={`/myDay/${timeParam}`} />;
    };

    const nextDay = (event) => {
        event.preventDefault();
        console.log('nextDay button clicked');
        myDate.setDate(day++);
        const timeParam = myDate.getTime();
        return <Navigate to={`/myDay/${timeParam}`} />;
    }

    // return (
    //         <div>
    //             <h1>Get Started with MyTime</h1>
    //             <Button className="btn btn-lg btn-light m-2" onClick={myDayNav}>
    //                 See MyDay
    //             </Button>
    //         </div>
    // );

    //was inside container
    /*
<DayBox
                    dayDate={currTime}
                    events={todayEvents}
                    showDescription={false}
                    showDescPreview={true}
                    showEventTime={true}
                />
    */

    return (
        <div>
            <div fluid className="jumbotron text-light bg-dark">
                <Container>
                    <h1>{userData.firstName}'s Day</h1>
                    <Button className="btn btn-lg btn-light m-2" onClick={prevDay}>{'<'}</Button>
                    <h2>{dayName}, {monthName} {day},{year}</h2>
                    <Button className="btn btn-lg btn-light m-2" onClick={nextDay}>{'>'}</Button>
                </Container>
            </div>
            <Container>
                <Row>
                    <h3> Today's Events </h3>
                </Row>
                <Container className="card-body">
                    {todayEvents && todayEvents.map((event) => (
                        <Row>
                            <p>{event.eventTitle}</p>
                        </Row>
                    ))}
                    <Row>
                        <Button onClick={() => setShowModal(true)}>Add Event</Button>
                    </Row>
                </Container>
            </Container>
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='addEvent-modal'>
                
                <Modal.Header closeButton>
                    <Modal.Title id='addEvent-modal'>
                        New Event
                    </Modal.Title>
                    <AddEventForm
                        eventDate={myDate}
                    />
                </Modal.Header>
            </Modal>
            
        </div>
    );
};

export default MyDay;