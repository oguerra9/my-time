import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_EVENT } from '../../utils/mutations';

import { Container, Row, Col } from 'react-bootstrap';

import Auth from '../../utils/auth';
import { getNumDays, getFirstWeekDay, getWeekDay, getMonthName } from '../../utils/dateFormat';
import events from 'inquirer/lib/utils/events';
import Week from '../Week';


const MonthFormat = ({
    monthNum,
    year,
    firstWeekDay,
    numDays,
    events,
});



const monthDays = [];
const dayOffset = firstWeekDay;
const monthWeeks = [];

for (var i = 0; i < firstWeekDay; i++) {
    const notDay = {
        dayDate: 0,
        events: [],
    };
    monthDays.push(notDay);
}
for (var j = 0; j < numDays; j++) {
    const daySq = {
        dayDate: (new Date(year, monthNum, j)).getTime(),
        events:[]
    };
    monthDays.push(daySq);
}
if (((monthDays.length) % 7) != 0) {
    const currLength = monthDays.length;
    const fullWeeks = currLength % 7;
    const leftOver = currLength - (fullWeeks * 7);
    const fillSpace = 7 - leftOver;

    for (var i = 0; i < fillSpace; i++) {
        const notDay = {
            dayDate: 0,
            events: [],
        };
        monthDays.push(notDay);
    }
}

for (var m = 0; m < (monthDays.length)/7; m++) {
    for (var n = m*7; n < monthDays.length; n++) {
        monthWeeks[m].push(monthDays[n]);
    }
}

for (var k = 0; k < events; k++) {
    if (events[k].eventDate && events[k].eventDate.getMonth() == monthNum) {
        monthDays[dayOffset + events[k].eventDate.getDate()].events.push(events[k]);
    }
}

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
                <Week
                    days={week.days}
                    monthView={true}
                />
            ))}
        </Container>
    </div>
)