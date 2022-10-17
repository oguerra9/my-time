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
    return (
        <div>Week will go here</div>
    );
};

export default MyWeek;