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
    console.log('myMonth page called');
    const { currTime } = useParams();
    const {loading, data } = useQuery(QUERY_ME);

    // const [addEvent, { error }] = useMutation(ADD_EVENT);

    let myDate = new Date ();
    if (currTime) {
        //console.log('----- currTime found ----- MyMonth');
        //console.log(currTime);
        myDate = new Date (parseInt(currTime));
        myDate.setHours(0);
        myDate.setMinutes(0);
        myDate.setSeconds(0);
        myDate.setMilliseconds(0);
    }
    
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
    let firstWeekDay = getFirstWeekDay(monthNum, yearNum);
    let numDays = getNumDays(monthNum, yearNum);
    let dateNum = myDate.getDate();
    let dayName = getDayName(myDate.getDay());
    let monthName = getMonthName(monthNum);

    let monthStart = parseInt(getMonthStart(currTime));
    let monthEnd = parseInt(getMonthEnd(currTime));
    console.log('monthStart = ' + JSON.stringify(monthStart));
    console.log('monthEnd = ' + JSON.stringify(monthEnd));

    let monthEvents = [];

    for (let i = 0; i < myEvents.length; i++) {
        console.log('----- adding events ----- MyMonth');
        const currEventDate = new Date(parseInt(myEvents[i].eventDate));
        const currEventDateMS = parseInt(currEventDate.getTime());

        if (currEventDateMS >= monthStart && currEventDateMS <= monthEnd) {
            console.log('----- event matching time frame ----- MyMonth');
            monthEvents.push(myEvents[i]);
        }
    }
    console.log('--- monthEvents --- MyMonth');
    console.log(monthEvents);

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

    // const prevMonthBtn = (event) => {
    //     console.log('prev month button clicked');
    //     return <Navigate to={`myDay/${getPrevMonth(currTime)}`} replace={true} />;
    // };

    // const nextMonthBtn = (event) => {
    //     console.log('next month button clicked');
    //     return <Navigate to={`myDay/${getNextMonth(currTime)}`} replace={true} />;
    // };

    console.log('=============================');
    console.log('=============================');
    const prevMonthTime = getPrevMonth(currTime);
    const nextMonthTime = getNextMonth(currTime);
    return (
        <div>
            <div className="jumbotron text-light bg-dark flex-row justify-content-center align-center p-3">
                <Container class="d-flex justify-content-center">
                    <div class="d-flex flex-row align-content-center justify-content-center col-6">                    
                        <Link to={`/myMonth/${prevMonthTime}`} class="pb-0 pr-2 col-1">
                            <Button>{'<'}</Button>
                        </Link>
                        <h1 class="p-0 m-0 ml-2 mr-2 text-center flex-fill">{monthName} {yearNum}</h1>
                        <Link to={`/myMonth/${nextMonthTime}`} class="pb-0 pl-0 col-1">
                            <Button>{'>'}</Button>
                        </Link>
                    </div>
                </Container>
            </div>
            <Container class="m-0 col-10">
                <MonthFormat
                    monthStart={JSON.stringify(monthStart)}
                    events={monthEvents}
                />
            </Container>
        </div>
    );
};

export default MyMonth;
