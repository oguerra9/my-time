import React, { useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { Container, Col, Row, Form, Button, Card, CardColumns, Modal } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_EVENT } from '../utils/mutations';
import { getNumDays, getFirstWeekDay, getDayName, getMonthName } from '../utils/dateFormat';
import { getMonthStart, getMonthEnd, getWeekStart, getWeekEnd, getDayStart, getDayEnd, getNextMonth, getPrevMonth, getNextWeek, getPrevWeek, getNextDay, getPrevDay } from '../utils/dateFunctions';
import AddEventForm from '../components/AddEventForm';
import MonthFormat from '../components/MonthFormat';


const MyWeek = () => {
    // return (
    //     <div class="d-flex flex-row mb-3" className="square border border-primary">
    //         {days && days.map((day) => (
    //             <div key={day.boxKey} className="square border border-primary">
    //                 <Card style={{ border: '1px #1a1a1a'}}>
    //                     <Card.Title>{day.dayDate}</Card.Title>
    //                     <Card.Body>
    //                         <EventsList
    //                             events={day.events} />
    //                     </Card.Body>
    //                 </Card>
    //             </div>
    //         ))}
    //     </div>
    // );
    return (
        <div>week will go here</div>
    );
};

export default MyWeek;