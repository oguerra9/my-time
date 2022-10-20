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
            <div fluid className="d-flex jumbotron text-light bg-dark p-2 align-content-center justify-center">
                <Container className="flex-row align-content-center justify-center ml-5" style={{ width: '70%'}}>
                    <Row className="text-center">
                        <h1>{dayName}</h1>
                    </Row>
                    <Row className="flex-row align-center">
                        <Link to={`/myDay/${getPrevDay(myDate.getTime())}`}>
                            <Button>{'<'}</Button>
                        </Link>
                        <h2 class="ml-2 mr-2">{monthName} {dateNum}, {yearNum}</h2>
                        <Link to={`/myDay/${getNextDay(myDate.getTime())}`}>
                            <Button>{'>'}</Button>
                        </Link>
                    </Row>
                </Container>
            </div>
            <div class="d-flex justify-content-center align-content-center" style={{ width: '100%' }}>
            <Card class="m-3 p-3" style={{ width: '70%'}}>
                <Card.Title class="bg-secondary text-light p-1 m-0">
                    <h3 class="m-0 p-0">Today's Events</h3>
                </Card.Title>
                <Card.Body class="d-flex align-content-start justify-content-start">
                    {todayEvents ? (
                        <Container>
                            <Row style={{ width: '100%', minHeight: '20px'}}>
                                {todayEvents && todayEvents.map((events) => {
                                    return (
                                        <div key={events._id} className="mb-1 pb-1">
                                            <h5 class="m-0">{events.eventTitle}</h5>
                                            <p>{events.eventDescription}</p>
                                        </div>
                                    );
                                })}

                                
                            </Row>
                            <Row>
                                <Button onClick={() => setShowModal(true)} style={{ width: '100%' }}>Add Event</Button>
                            </Row>
                        </Container>
                    ) : (
                        <Row>
                            <Button onClick={() => setShowModal(true)} style={{ width: '100%' }}>Add Event</Button>
                        </Row>
                    )}
                </Card.Body>
            </Card>
            </div>
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='addEvent-modal'>

                <Modal.Header closeButton>
                    <Modal.Title id='addEvent-modal'>
                        <h3 class="m-0 p-0">New Event</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddEventForm
                        eventDateIn={myTime}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default MyDay;
