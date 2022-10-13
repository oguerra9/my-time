import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Row, Col, Button } from 'react-bootstrap';

import MonthFormat from '../components/MonthFormat';
import { getNumDays, getFirstWeekDay, getDayName, getMonthName, getMonthStart, getMonthEnd, getWeekStart, getWeekEnd, getDayStart, getDayEnd, getNextMonth, getPrevMonth, getNextWeek, getPrevWeek, getNextDay, getPrevDay } from '../utils/dateFormat';

import { QUERY_EVENTS, QUERY_ME } from '../utils/queries';

const Month = () => {
    const { myTime } = useParams();
    const { loading, data } = useQuery(QUERY_ME);

    // const startTime = getMonthStart(myTime);
    // const endTime = getMonthEnd(myTime);
    let userData = {};

    if (data) {
        userData = data.me;
    }

    console.log("----- user data: -----");
    console.log(userData);
    const myEvents = userData.events;
    console.log("----- my events: -----");
    console.log(myEvents);

    const myDate = new Date(myTime);
    let month = myDate.getMonth();
    let year = myDate.getFullYear();

    const monthEvents = [];

    for (let i = 0; i < myEvents.length; i++) {
        if (myEvents[i].eventDate.getMonth() === month && myEvents[i].eventDate.getFullYear() === year) {
            monthEvents.push(myEvents[i]);
        }
    }
     

    const handleNextMonthBtn = async (event) => {
        event.preventDefault();
        
        const nextMonth = myDate.setMonth(month++);
        const timeParam = nextMonth.getTime();
        return <Navigate to={`/month/${timeParam}`} />;
    };
    

    const handlePrevMonthBtn = async (event) => {
        event.preventDefault();

        const prevMonth = myDate.setMonth(month--);
        const timeParam = prevMonth.getTime();

        return <Navigate to={`/month/${timeParam}`} />;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Container>
                <Row>
                    <Button onClick={handlePrevMonthBtn}>Prev Month</Button>
                    <h3>{getMonthName(myDate.getMonth())}</h3>
                    <Button onClick={handleNextMonthBtn}>Next Month</Button>
                </Row>
                <Row>
                    <Month 
                        monthNum={myDate.getMonth()}
                        year={myDate.getFullYear()}
                        firstWeekDay={getFirstWeekDay(myTime)}
                        numDays={getNumDays(myDate.getMonth())}
                        events={myEvents}
                    />
                </Row>
            </Container>
        </div>
    );

};

export default Month;