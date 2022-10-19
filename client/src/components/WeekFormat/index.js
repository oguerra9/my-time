import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_EVENT } from '../../utils/mutations';

import { Container, Row, Col, Modal, Table, Button, Card } from 'react-bootstrap';

import Auth from '../../utils/auth';
import { getNumDays, getFirstWeekDay, getDayName, getMonthName, getDayFormat } from '../../utils/dateFormat';
import { getMonthStart, getMonthEnd, getWeekStart, getWeekEnd, getDayStart, getDayEnd, getNextMonth, getPrevMonth, getNextWeek, getPrevWeek, getNextDay, getPrevDay } from '../../utils/dateFunctions';
//import events from 'inquirer/lib/utils/events';
//import Week from '../Week';
//import AddEventForm from '../AddEventForm';
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

        for (let j = 0; j < events.length; j++) {
            if ((parseInt(events[j].eventDate)) >= currDateStart && (parseInt(events[j].eventDate)) <= currDateEnd) {
                dayEvents.push(events[j]);
            }
        }

        let dayObj = {
            boxKey: currDayTime,
            dayDateString: boxDate,
            events: dayEvents,
        };

        weekDays.push(dayObj);

        currDayTime = getNextDay(currDayTime);
    }

    return (
        <div class="d-flex flex-row mb-3" className="square border border-primary">
            {weekDays && weekDays.map((day) => (
                <div key={day.boxKey} className="square border border-primary">
                    <Link to={`/myDay/${day.dayDate}`}>
                        <Card style={{ border: '1px #1a1a1a'}}>
                            <Card.Title>{day.dayDateString}</Card.Title>
                            <Card.Body>
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