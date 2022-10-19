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
import WeekFormat from '../components/WeekFormat';


const MyWeek = () => {

    console.log('myWeek page called');
    const { currTime } = useParams();
    const { loading, data } = useQuery(QUERY_ME);

    let myDate = new Date();
    if (currTime) {
        myDate = new Date(parseInt(currTime));
    }

    let userData = {};
    let myEvents = [];

    if (data) {
        console.log('user data found');
        userData = data.me;
        myEvents = userData.events;
    }

    let weekMark = myDate.getTime();

    let weekStartTime = parseInt(getWeekStart(weekMark));
    let weekEndTime = parseInt(getWeekEnd(weekMark));

    let weekEvents = [];

    for (let i = 0; i < myEvents.length; i++) {
        const currEventDate = new Date(parseInt(myEvents[i].eventDate));
        const currEventDateMS = parseInt(currEventDate.getTime());

        if (currEventDateMS >= weekStartTime && currEventDateMS <= weekEndTime) {
            weekEvents.push(myEvents[i]);
        }
    }

    if (loading) {
        return <h2>LOADING...</h2>
    }

    const prevWeekTime = getPrevWeek(currTime);
    const nextWeekTime = getNextWeek(currTime);

    let weekStartDate = new Date(parseInt(weekStartTime));
    let weekStartMonth = weekStartDate.getMonth() + 1;
    let weekStartDateNum = weekStartDate.getDate();
    let firstWeekDayStr = JSON.stringify(weekStartMonth) + '/' + JSON.stringify(weekStartDateNum);
//    let firstWeekDayStr = getMonthName(weekStartMonth - 1).substring(0,3) + ' ' + JSON.stringify(weekStartDateNum);

    
    let weekEndDate = new Date(parseInt(weekEndTime));
    let weekEndMonth = weekEndDate.getMonth() + 1;
    let weekEndDateNum = weekEndDate.getDate();
    let lastWeekDayStr = JSON.stringify(weekEndMonth) + '/' + JSON.stringify(weekEndDateNum);
//    let lastWeekDayStr = getMonthName(weekEndMonth - 1).substring(0,3) + ' ' + JSON.stringify(weekEndDateNum);

    let weekRangeStr = firstWeekDayStr + ' - ' + lastWeekDayStr;


    return (
        <div>
            <div class="jumbotron text-light bg-dark flex-row justify-content-center align-center p-3">
                <Container class="d-flex flex-row align-content-center">
                    <div class="d-flex flex-row align-content-center justify-content-center col-6">
                        <Link to={`/myWeek/${prevWeekTime}`} className="pb-0 pl-2 col-1">
                            <Button>{'<'}</Button>
                        </Link>
                        <h1 class="p-0 m-0 text-center col-10">{weekRangeStr}</h1>
                        <Link to={`/myWeek/${nextWeekTime}`} className="pb-0 pl-2 col-1">
                            <Button>{'>'}</Button>
                        </Link>
                    </div>
                </Container>
            </div>
            <Container class="m-0 col-10">
                <WeekFormat
                    weekMark={currTime}
                    events={weekEvents} />
            </Container>
        </div>
    );

};

export default MyWeek;