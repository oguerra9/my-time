import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import MonthFormat from '../components/Month';
import { getNumDays, getFirstWeekDay, getWeekDay, getMonthStart, getMonthEnd, getWeekStart, getWeekEnd, getDayStart, getDayEnd, getNextMonth, getPrevMonth, getNextWeek, getPrevWeek, getNextDay, getPrevDay } from '../utils/dateFormat';

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

    const handleNextMonthBtn = async (event) => {
        event.preventDefault();

        startTime = getNextMonth(startTime);
        endTime = getMonthEnd(startTime);

        const { loading, data } = useQuery(QUERY_EVENTS, {
            variables: {
                startTime: startTime,
                endTime:endTime,
            }
        });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Row>
                
            </Row>
        </div>
    )

}

export default Month;