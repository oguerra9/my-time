import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_EVENT } from '../../utils/mutations';

import { Container, Row, Col, Modal } from 'react-bootstrap';

import Auth from '../../utils/auth';
import { getNumDays, getFirstWeekDay, getDayName, getMonthName } from '../../utils/dateFormat';
import events from 'inquirer/lib/utils/events';
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

    for (var m = 0; m < (monthDays.length)/7; m++) {
        for (var n = m*7; n < monthDays.length; n++) {
            monthWeeks[m].push(monthDays[n]);
        }
    }

    for (var p = 0; p < events; p++) {
        if (events[p].eventDate && events[p].eventDate.getMonth() === monthNum) {
            monthDays[dayOffset + events[p].eventDate.getDate()].events.push(events[p]);
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