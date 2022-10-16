import React, { useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { Container, Col, Row, Form, Button, Card, CardColumns, Modal } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_EVENT } from '../utils/mutations';
import { getNumDays, getFirstWeekDay, getDayName, getMonthName } from '../utils/dateFormat';
import { getMonthStart, getMonthEnd, getWeekStart, getWeekEnd, getDayStart, getDayEnd, getNextMonth, getPrevMonth, getNextWeek, getPrevWeek, getNextDay, getPrevDay } from '../utils/dateFunctions';
import AddEventForm from '../components/AddEventForm';
import MonthFormat from '../components/MonthFormat';

const MyMonth = () => {
    //const [ showModal, setShowModal ] = useState(false);
    const { currTime } = useParams();
    const {loading, data } = useQuery(QUERY_ME);

    // const [addEvent, { error }] = useMutation(ADD_EVENT);

    let myDate = new Date ();
    if (currTime) {
        myDate = new Date (parseInt(currTime));
        myDate.setHours(0);
        myDate.setMinutes(0);
        myDate.setSeconds(0);
        myDate.setMilliseconds(0);
    }
    
    let myTime = myDate.getTime();

    let userData = {};
    let myEvents = {};

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
    let firstWeekDay = getFirstWeekDay(monthNum, yearNum);
    let numDays = getNumDays(monthNum, yearNum);
    let dateNum = myDate.getDate();
    let dayName = getDayName(myDate.getDay());
    let monthName = getMonthName(monthNum);

    let monthStart = parseInt(getMonthStart(currTime));
    let monthEnd = parseInt(getMonthEnd(currTime));

    let monthEvents = [];

    for (let i = 0; i < myEvents; i++) {
        const currEventDate = new Date(parseInt(myEvents[i].eventDate));
        const currEventDateMS = parseInt(currEventDate.getTime());

        if (currEventDateMS >= monthStart && currEventDateMS <= monthEnd) {
            monthEvents.push(myEvents[i]);
        }
    }

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
            <div fluid className="jumbotron text-light bg-dark">
                <Container>
                    <Row>
                        <h1>{userData.firstName}'s Day</h1>
                    </Row>
                    <Row>
                        <Col>
                            <Link to={`/myMonth/${getPrevMonth(myDate.getTime())}`}>{'<'}</Link>
                        </Col>
                        <Col><h2>{monthName} {yearNum}</h2></Col>
                        <Col>
                            <Link to={`/myMonth/${getNextMonth(myDate.getTime())}`}>{'>'}</Link>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <MonthFormat
                    monthNum={monthNum}
                    year={yearNum}
                    firstWeekDay={firstWeekDay}
                    numDays={numDays}
                    events={monthEvents}
                />
            </Container>
        </div>
    );
};

export default MyMonth;
