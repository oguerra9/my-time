import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import MonthFormat from '../components/Month';
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
        endTime = getMonthEnd(startTime);

        const { loading, data } = useQuery(QUERY_EVENTS, {
            variables: {
                startTime: startTime,
                endTime:endTime,
            }
        });
    }

    const handlePrevMonthBtn = async (event) => {
        event.preventDefault();

        startTime = getMonthStart(getPrevMonth(startTime));
        endTime = getMonthEnd(startTime);

        const { loading, data } = useQuery(QUERY_EVENTS, {
            variables: {
                startTime: startTime,
                endTime: endTime,
            }
        })
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Row>
                <Button onClick={handlePrevMonthBtn}>Prev Month</Button>
                <h3>{getMonthName(startTime.getMonth())}</h3>
                <Button onClick={handleNextMonthBtn}>Next Month</Button>
            </Row>
            <MonthFormat 
                monthNum={startTime.getMonth()}
                year={startTime.getFullYear()}
                firstWeekDay={getFirstWeekDay(startTime)}
                numDays={getNumDays(startTime.getMonth())}
                events={events}
            />
        </div>
    )

}

export default Month;