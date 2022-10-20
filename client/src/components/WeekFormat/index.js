import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../../utils/mutations';
import { Container, Row, Col, Modal, Table, Button, Card } from 'react-bootstrap';

import Auth from '../../utils/auth';
import { getNumDays, getFirstWeekDay, getDayName, getMonthName, getDayFormat } from '../../utils/dateFormat';
import { getMonthStart, getMonthEnd, getWeekStart, getWeekEnd, getDayStart, getDayEnd, getNextMonth, getPrevMonth, getNextWeek, getPrevWeek, getNextDay, getPrevDay } from '../../utils/dateFunctions';
import EventsList from '../EventsList';


const WeekFormat = ({
    weekMark,
    events
}) => {
    const weekMarkDate = new Date(parseInt(weekMark));
    const weekStartDate = new Date(parseInt(getWeekStart(weekMarkDate.getTime())));
    const weekEndDate = new Date(parseInt(getWeekEnd(weekMarkDate.getTime())));
    const weekStartTime = parseInt(weekStartDate.getTime());
    const weekEndTime = parseInt(weekEndDate.getTime());

    let currDayTime = weekStartTime;
    

    let weekDays = [];

    for (let i = 0; i < 7; i++) {
        let currDate = new Date(parseInt(currDayTime));
        let currDateStart = parseInt(getDayStart(currDayTime));
        let currDateEnd = parseInt(getDayEnd(currDayTime));
        let currMonthNum = (currDate.getMonth()) + 1;
        let currDateNum = currDate.getDate();
        let boxDate = JSON.stringify(currMonthNum) + '/' + JSON.stringify(currDateNum);

        let dayEvents = [];

        let currDayName = getDayName(currDate.getDay());

        for (let j = 0; j < events.length; j++) {
            if ((parseInt(events[j].eventDate)) >= currDateStart && (parseInt(events[j].eventDate)) <= currDateEnd) {
                dayEvents.push(events[j]);
            }
        }

        let dayObj = {
            boxKey: currDayTime,
            dayDateString: boxDate,
            dayName: currDayName,
            events: dayEvents,
        };

        weekDays.push(dayObj);

        currDayTime = getNextDay(currDayTime);
    }

    return (
        <div class="d-flex flex-row mb-3" className="square border border-white">
            {weekDays && weekDays.map((day) => (
                <div key={day.boxKey} className="border border-light m-2" style={{ borderRadius: '10px' }}>
                    <Link to={`/myDay/${parseInt(day.boxKey)}`}>
                        <Card class="border border-dark">
                            <Card.Title class="m-0 border border-secondary p-1 bg-secondary text-light" style={{ borderRadius: '10px 10px 0px 0px'}}>
                                <>{day.dayName} - {day.dayDateString}</>
                            </Card.Title>
                            <Card.Body class="m-0 p-1" style={{ minHeight: '150px' }}>
                                <EventsList
                                    events={day.events} />
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
            ))}
        </div>
    );

};

export default WeekFormat;