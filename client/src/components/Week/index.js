import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Modal, Button } from 'react-bootstrap';
//import events from 'inquirer/lib/utils/events';
import DayBox from '../DayBox';
import EventsList from '../EventsList';
import AddEventForm from '../AddEventForm';

const Week = ({
    days,
}) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {days && days.map((day) => (

                <DayBox
                    boxKey={day.boxKey}
                    dayDate={day.dayDate}
                    events={day.events} />
            ))}
        </>
    );
};

export default Week;