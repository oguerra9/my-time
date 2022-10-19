import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_EVENT } from '../../utils/mutations';

import { Container, Row, Col, Modal, Table, Button } from 'react-bootstrap';

import Auth from '../../utils/auth';
import { getNumDays, getFirstWeekDay, getDayName, getMonthName, getDayFormat } from '../../utils/dateFormat';
import { getMonthStart, getMonthEnd, getWeekStart, getWeekEnd, getDayStart, getDayEnd, getNextMonth, getPrevMonth, getNextWeek, getPrevWeek, getNextDay, getPrevDay } from '../../utils/dateFunctions';
//import events from 'inquirer/lib/utils/events';
import Week from '../Week';
//import AddEventForm from '../AddEventForm';


const MonthFormat = ({
    monthStart,
    events
}) => {
    const monthStartDate = new Date(parseInt(monthStart));
    const monthNum = monthStartDate.getMonth();
    const yearNum = monthStartDate.getFullYear();
    const weekOffset = monthStartDate.getDay();

    const numDays = getNumDays(monthNum, yearNum);

    let monthDays = [];

    for (let i = 0; i < weekOffset; i++) {
        let notDate = 'blank' + JSON.stringify(i);
        let dayObj = {
            boxKey: notDate,
            dayDate: 0,
            events: []
        };
        monthDays.push(dayObj);
    }

    console.log('numDays');
    console.log(numDays);
    for (let j = 1; j <= numDays; j++) {
        let cardDate = new Date(yearNum, monthNum, j);
        let dayNum = j;
        let dayStart = getDayStart(cardDate.getTime());
        let dayEnd = getDayEnd(cardDate.getTime());
        let dayEvents = [];

        for (let k = 0; k < events.length; k++) {
            if (parseInt(events[k].eventDate) >= dayStart && parseInt(events[k].eventDate) <= dayEnd) {
                dayEvents.push(events[k]);
            }
        }

        const dayDateTime = cardDate.getTime();

        let dayObj = {
            boxKey: dayDateTime,
            dayDate: dayNum,
            events: dayEvents
        };

        monthDays.push(dayObj);
    }

    if (monthDays.length % 7 !== 0) {
        console.log('confirmed');
        console.log('remaining days: ' + (monthDays.length % 7));
        let remainingDays = monthDays.length % 7;
        let numTrail = 7 - remainingDays;
        console.log('numTrail (should be 7 - remaining days): ' + numTrail);

        let monthDayLen = monthDays.length;
        for (let m = 0; m < numTrail; m++) {
            let numBox = monthDayLen + m;
            let notDate = 'blank' + JSON.stringify(numBox);
            let dayObj = {
                boxKey: notDate,
                dayDate: 0,
                events: []
            };
            monthDays.push(dayObj);
        }
    }

    const numWeeks = monthDays.length / 7;
    let monthWeeks = [];

    for (let p = 0; p < numWeeks; p++) {
        let weekDays = [];
        let weekPoint = 0;
        for (let q = 0; q < 7; q++) {
            weekDays.push(monthDays[(p * 7) + q]);
            console.log('--- adding monthDays --- MonthFormat');
            console.log(monthDays[(p*7) + q]);

            if (parseInt(monthDays[(p * 7) + q].dayDate) !== 0 && weekPoint === 0) {
                weekPoint = monthDays[(p * 7) + q].boxKey;
            }
        }
        monthWeeks.push({
            weekMark: weekPoint,
            days: weekDays
        });
    }
    console.log('--- monthWeeks --- MonthFormat');
    console.log(monthWeeks);
    console.log('--- monthDays --- MonthFormat');
    console.log(monthDays);
    return (
        <>
            <div fluid='true' class="rounded rounded-3" style={{ width: '100%' }}>
                <div class="d-flex flex-row">
                    <div class="p-2" style={{ width: '2%' }}> </div>
                    <div class="text-center p-1 bg-secondary" style={{ width: '14%', borderRadius: '10px 0px 0px 0px' }}>Sunday</div>
                    <div class="text-center p-1 bg-secondary" style={{ width: '14%' }}>Monday</div>
                    <div class="text-center p-1 bg-secondary" style={{ width: '14%' }}>Tuesday</div>
                    <div class="text-center p-1 bg-secondary" style={{ width: '14%' }}>Wednesday</div>
                    <div class="text-center p-1 bg-secondary" style={{ width: '14%' }}>Thursday</div>
                    <div class="text-center p-1 bg-secondary" style={{ width: '14%' }}>Friday</div>
                    <div class="text-center p-1 bg-secondary" style={{ width: '14%', borderRadius: '0px 10px 0px 0px' }}>Saturday</div>
                </div>
                {monthWeeks && monthWeeks.map((week) => (
                    <div key={week.weekMark} class="d-flex flex-row justify-content-start">
                        <Link to={`/myWeek/${week.weekMark}`} class="rounded-start rounded-3 bg-dark m-0 d-flex justify-content-center align-content-end " style={{ borderRadius: '20px 0px 0px 20px'}}>
                            <Button class="d-flex justify-content-center bg-primary m-0 p-1 border border-primary" style={{ width: '23px', height: '144px', borderRadius: '20px 0px 0px 20px' }}>
                            </Button>
                        </Link>
                        <Week 
                           days={week.days} />    
                   </div>
                 ))}
            </div>
        </>
    );

};

export default MonthFormat;















// const MonthFormat = ({
//     monthNum,
//     year,
//     firstWeekDay,
//     numDays,
//     events,
// }) => {
//     //const [showModal, setShowModal] = useState(false);

//     const monthDays = [];
//     const dayOffset = firstWeekDay;
//     const monthWeeks = [];

//     // adds empty days to at front of month so every week is full
//     for (var i = 0; i < firstWeekDay; i++) {
//         const notDay = {
//             dayDate: 0,
//             events: [],
//         };
//         monthDays.push(notDay);
//     }

//     // adds a day object for each day of the month, assigns the date of each box, looks for events within the day's time window, 
//     // and adds the events to the object's events array
//     for (var j = 0; j < numDays; j++) {
//         const dayEvents = [];
//         const dayTime = parseInt((new Date(year, monthNum, j)).getTime());
//         const dayStart = getDayStart(dayTime);
//         const dayEnd = getDayEnd(dayTime);
//         for (let x = 0; x < events.length; x++) {
//             const eventTime = parseInt(events[x].eventDate);
//             if (eventTime >= dayStart && eventTime <= dayEnd) {
//                 dayEvents.push(events[x]);
//             }
//         }
//         const daySq = {
//             dayDate: dayTime,
//             events: dayEvents,
//         };
//         monthDays.push(daySq);
//     }

//     // adds empty days to end of month so array length is divisible by 7, so each week is 7 days
//     if (((monthDays.length) % 7) !== 0) {
//         const currLength = monthDays.length;
//         const fullWeeks = currLength % 7;
//         const leftOver = currLength - (fullWeeks * 7);
//         const fillSpace = 7 - leftOver;

//         for (var k = 0; k < fillSpace; k++) {
//             const notDay = {
//                 dayDate: 0,
//                 events: [],
//             };
//             monthDays.push(notDay);
//         }
//     }

//     const numWeeks = monthDays.length / 7;
//     const firstDay = new Date(year, monthNum, 0);
//     const monthEndTime = parseInt(getMonthEnd(firstDay.getTime()));
//     const endFirstWeek = parseInt(getWeekEnd(parseInt(firstDay.getTime())));
    
//     let firstWeek = [];
//     for (let w = 0; w < monthDays.length; w++) {
//         if (parseInt(monthDays[w].dayDate) < endFirstWeek) {
//             firstWeek.push(monthDays[w]);
//         }
//     }
//     monthWeeks.push(firstWeek);

//     let weekDay = new Date(parseInt(getNextWeek(firstDay.getTime())));

//     for (let q = 1; q < numWeeks - 1; q++) {
//         let weekDays = [];
//         let weekStart = parseInt(getWeekStart(weekDay.getTime()));
//         let weekEnd = parseInt(getWeekEnd(weekDay.getTime()));

//         for (let f = 0; f < monthDays.length; f++) {
//             if (parseInt(monthDays[f].dayDate) >= weekStart && parseInt(monthDays[f].dayDate) <= weekEnd) {
//                 weekDays.push(monthDays[f]);
//             }
//         }

//         monthWeeks.push(weekDays);

//         weekDay = new Date(parseInt(getNextWeek(weekDay.getTime())));
//     }

//     let lastWeekDays = [];
//     for (let a = 0; a < monthDays.length; a++) {
        
//         const startLastWeek = parseInt(getWeekStart(weekDay.getTime()));
        
//         if ((parseInt(monthDays[a].dayDate) >= startLastWeek && parseInt(monthDays[a].dayDate) <= monthEndTime) || (parseInt(monthDays[a].dayDate)) === 0) {
//             lastWeekDays.push(monthDays[a]);
//         }
//     }
//     monthWeeks.push(lastWeekDays);

//     // // adds each event
//     // for (var p = 0; p < events; p++) {
//     //     if (events[p].eventDate !== 0 && events[p].eventDate.getMonth() === monthNum) {
//     //         monthDays[dayOffset + events[p].eventDate.getDate()].events.push(events[p]);
//     //     }
//     // }


//     return (
//         <div>
//             <Container>
//                 <Row>
//                     <Col></Col>
//                     <Col>Sunday</Col>
//                     <Col>Monday</Col>
//                     <Col>Tuesday</Col>
//                     <Col>Wednesday</Col>
//                     <Col>Thursday</Col>
//                     <Col>Friday</Col>
//                     <Col>Saturday</Col>
//                 </Row>
//                 {monthWeeks && monthWeeks.map((week) => (
//                     <Row>
//                         <Week
//                             days={week.days}
//                             monthView={true}
//                         />
//                     </Row>
//                 ))}
//             </Container>
//         </div>
//     );
// };

// export default MonthFormat;