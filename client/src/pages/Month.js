import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MonthFormat from '../components/MonthFormat';
import { getNumDays, getFirstWeekDay, getWeekDay, getMonthName, getMonthStart, getMonthEnd, getWeekStart, getWeekEnd, getDayStart, getDayEnd, getNextMonth, getPrevMonth, getNextWeek, getPrevWeek, getNextDay, getPrevDay } from '../utils/dateFormat';

import { QUERY_EVENTS, QUERY_ME } from '../utils/queries';

const Month = () => {
    const { myTime } = useParams();
    const startTime = getMonthStart(myTime);
    const endTime = getMonthEnd(myTime);

    const { loading, data } = useQuery(QUERY_EVENTS, {
        variables: {
            startTime: startTime,
            endTime: endTime,
        }
    });

    const events = data?.events || {};

    const handleNextMonthBtn = async (event) => {
        event.preventDefault();

        startTime = getMonthStart(getNextMonth(startTime));
        return <Navigate to="/month/startTime" />;
    };

    const handlePrevMonthBtn = async (event) => {
        event.preventDefault();

        startTime = getMonthStart(getPrevMonth(startTime));
        return <Navigate to="/month/startTime" />;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Container>
                <Row>
                    <Button onClick={handlePrevMonthBtn}>Prev Month</Button>
                    <h3>{getMonthName(startTime.getMonth())}</h3>
                    <Button onClick={handleNextMonthBtn}>Next Month</Button>
                </Row>
                <Row>
                    <Month 
                        monthNum={startTime.getMonth()}
                        year={startTime.getFullYear()}
                        firstWeekDay={getFirstWeekDay(startTime)}
                        numDays={getNumDays(startTime.getMonth())}
                        events={events}
                    />
                </Row>
            </Container>
        </div>
    );

};

export default Month;