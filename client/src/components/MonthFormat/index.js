import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_EVENT } from '../../utils/mutations';

import { Container, Row, Col, Modal } from 'react-bootstrap';

import Auth from '../../utils/auth';
import { getNumDays, getFirstWeekDay, getDayName, getMonthName } from '../../utils/dateFormat';
import { getMonthStart, getMonthEnd, getWeekStart, getWeekEnd, getDayStart, getDayEnd, getNextMonth, getPrevMonth, getNextWeek, getPrevWeek, getNextDay, getPrevDay } from '../../utils/dateFunctions';
//import events from 'inquirer/lib/utils/events';
import Week from '../Week';
//import AddEventForm from '../AddEventForm';


const MonthFormat = ({
    monthNum,
    year,
    firstWeekDay,
    numDays,
    events,
}) => {
    //const [showModal, setShowModal] = useState(false);

    const monthDays = [];
    const dayOffset = firstWeekDay;
    const monthWeeks = [];

    // adds empty days to at front of month so every week is full
    for (var i = 0; i < firstWeekDay; i++) {
        const notDay = {
            dayDate: 0,
            events: [],
        };
        monthDays.push(notDay);
    }

    // adds a day object for each day of the month, assigns the date of each box, looks for events within the day's time window, 
    // and adds the events to the object's events array
    for (var j = 0; j < numDays; j++) {
        const dayEvents = [];
        const dayTime = parseInt((new Date(year, monthNum, j)).getTime());
        const dayStart = getDayStart(dayTime);
        const dayEnd = getDayEnd(dayTime);
        for (let x = 0; x < events.length; x++) {
            const eventTime = parseInt(events[x].eventDate);
            if (eventTime >= dayStart && eventTime <= dayEnd) {
                dayEvents.push(events[x]);
            }
        }
        const daySq = {
            dayDate: dayTime,
            events: dayEvents,
        };
        monthDays.push(daySq);
    }

    // adds empty days to end of month so array length is divisible by 7, so each week is 7 days
    if (((monthDays.length) % 7) !== 0) {
        const currLength = monthDays.length;
        const fullWeeks = currLength % 7;
        const leftOver = currLength - (fullWeeks * 7);
        const fillSpace = 7 - leftOver;

        for (var k = 0; k < fillSpace; k++) {
            const notDay = {
                dayDate: 0,
                events: [],
            };
            monthDays.push(notDay);
        }
    }

    const numWeeks = monthDays.length / 7;
    const firstDay = new Date(year, monthNum, 0);
    const monthEndTime = parseInt(getMonthEnd(firstDay.getTime()));
    const endFirstWeek = parseInt(getWeekEnd(parseInt(firstDay.getTime())));
    
    let firstWeek = [];
    for (let w = 0; w < monthDays.length; w++) {
        if (parseInt(monthDays[w].dayDate) < endFirstWeek) {
            firstWeek.push(monthDays[w]);
        }
    }
    monthWeeks.push(firstWeek);

    let weekDay = new Date(parseInt(getNextWeek(firstDay.getTime())));

    for (let q = 1; q < numWeeks - 1; q++) {
        let weekDays = [];
        let weekStart = parseInt(getWeekStart(weekDay.getTime()));
        let weekEnd = parseInt(getWeekEnd(weekDay.getTime()));

        for (let f = 0; f < monthDays.length; f++) {
            if (parseInt(monthDays[f].dayDate) >= weekStart && parseInt(monthDays[f].dayDate) <= weekEnd) {
                weekDays.push(monthDays[f]);
            }
        }

        monthWeeks.push(weekDays);

        weekDay = new Date(parseInt(getNextWeek(weekDay.getTime())));
    }

    let lastWeekDays = [];
    for (let a = 0; a < monthDays.length; a++) {
        
        const startLastWeek = parseInt(getWeekStart(weekDay.getTime()));
        
        if ((parseInt(monthDays[a].dayDate) >= startLastWeek && parseInt(monthDays[a].dayDate) <= monthEndTime) || (parseInt(monthDays[a].dayDate)) === 0) {
            lastWeekDays.push(monthDays[a]);
        }
    }
    monthWeeks.push(lastWeekDays);

    // // adds each event
    // for (var p = 0; p < events; p++) {
    //     if (events[p].eventDate !== 0 && events[p].eventDate.getMonth() === monthNum) {
    //         monthDays[dayOffset + events[p].eventDate.getDate()].events.push(events[p]);
    //     }
    // }


    return (
        <div>
            <Container>
                <Row>
                    <Col>Week</Col>
                    <Col>Sunday</Col>
                    <Col>Monday</Col>
                    <Col>Tuesday</Col>
                    <Col>Wednesday</Col>
                    <Col>Thursday</Col>
                    <Col>Friday</Col>
                    <Col>Saturday</Col>
                </Row>
                {monthWeeks && monthWeeks.map((week) => (
                    <Row>
                        <Week
                            days={week.days}
                            monthView={true}
                        />
                    </Row>
                ))}
            </Container>
        </div>
    );
};

export default MonthFormat;