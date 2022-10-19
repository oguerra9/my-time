import React, { useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { Container, Col, Row, Form, Button, Card, CardColumns, Modal } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_EVENT } from '../utils/mutations';
import { getNumDays, getFirstWeekDay, getDayName, getMonthName } from '../utils/dateFormat';
import { getMonthStart, getMonthEnd, getWeekStart, getWeekEnd, getDayStart, getDayEnd, getNextMonth, getPrevMonth, getNextWeek, getPrevWeek, getNextDay, getPrevDay } from '../utils/dateFunctions';
import AddEventForm from '../components/AddEventForm';
import EventsList from '../components/EventsList';

const MyDay = () => {
    const [ showModal, setShowModal ] = useState(false);
    const { currTime } = useParams();
    console.log('--- currTime --- MyDay');
    console.log(currTime);
    const {loading, data } = useQuery(QUERY_ME);

    // const [addEvent, { error }] = useMutation(ADD_EVENT);

    let myDate = new Date ();
    if (currTime) {
        myDate = new Date (parseInt(currTime));
    }
    myDate.setHours(0);
    myDate.setMinutes(0);
    myDate.setSeconds(0);
    myDate.setMilliseconds(0);

    let myTime = myDate.getTime();

    let userData = {};
    let myEvents = [];

    if (data) {
        console.log('user data found');
        userData = data.me;
        console.log(userData);
        myEvents = userData.events;
        console.log('user events');
        console.log(myEvents);
    } 

    let monthNum = myDate.getMonth();
    let yearNum = myDate.getFullYear();
    let dateNum = myDate.getDate();
    let dayName = getDayName(myDate.getDay());
    let monthName = getMonthName(monthNum);

    let dayStart = getDayStart(myTime);
    let dayEnd = getDayEnd(myTime);

    let todayEvents = [];

    for (let i = 0; i < myEvents.length; i++) {
        // const currEventDate = new Date(parseInt(myEvents[i].eventDate));

        // if (currEventDate.getDate() === dateNum && currEventDate.getMonth() === monthNum && currEventDate.getFullYear() === yearNum) {
        //     todayEvents.push(myEvents[i]);
        // }
        if (parseInt(myEvents[i].eventDate) >= dayStart && parseInt(myEvents[i].eventDate) <= dayEnd) {
            todayEvents.push(myEvents[i]);
        }
    }

    console.log('--- todayEvents --- MyDay');
    console.log(todayEvents);

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    // const prevDay = (event) => {
    //     event.preventDefault();
    //     console.log(myDate);
    //     console.log('prevDay button clicked');
    //     myDate.setDate(dateNum--);
    //     console.log(myDate);
    //     const timeParam = myDate.getTime();
    //     return <Navigate to={`/myDay/${timeParam}`} />;
    // };

    // const nextDay = (event) => {
    //     event.preventDefault();
    //     console.log(myDate);
    //     console.log('nextDay button clicked');
    //     myDate.setDate(dateNum++);
    //     console.log(myDate);
    //     const timeParam = myDate.getTime();
    //     return <Navigate to={`/myDate/${timeParam}`} />;
    // };

    return (
        <div>
            <div fluid className="jumbotron text-light bg-dark p-2 align-center justify-center">
                <Container className="flex-row align-center justify-center">
                    <Row className="align-center justify-center flex-row">
                        <h2>{dayName}</h2>
                    </Row>
                    <Row className="flex-row align-center">
                        <Link to={`/myDay/${getPrevDay(myDate.getTime())}`}>
                            <Button>{'<'}</Button>
                        </Link>
                        <h2>{monthName} {dateNum}, {yearNum}</h2>
                        <Link to={`/myDay/${getNextDay(myDate.getTime())}`}>
                            <Button>{'>'}</Button>
                        </Link>
                    </Row>
                </Container>
            </div>
            <Card>
                <Card.Title>
                    <h3>Today's Events</h3>
                </Card.Title>
                <Card.Body>
                    {todayEvents ? (
                        <Container>
                            <Row>
                                <EventsList
                                    events={todayEvents}
                                />
                            </Row>
                            <Row>
                                <Button onClick={() => setShowModal(true)}>Add Event</Button>
                            </Row>
                        </Container>
                    ) : (
                        <Row>
                            <Button onClick={() => setShowModal(true)}>Add Event</Button>
                        </Row>
                    )}
                </Card.Body>
            </Card>
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
                        eventDateIn={myTime}
                    />
                </Modal.Header>
            </Modal>
        </div>
    );
};

export default MyDay;
