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
                <>
                {day.dayDate == 0 ? (
                    <div key={day.boxKey} class="border border-secondary" style={{width: '14%', height: '144px'}}>
                        <div class="card" style={{ border: '1px #1a1a1a'}}>
                            <p> </p>
                        </div>
                    </div>
                ) : ( 
                    <>
                    <div key={day.boxKey} class="border border-secondary" style={{width: '14%', height: '144px'}}>
                        
                            <Button onClick={() => setShowModal(true)} id={`day.boxKey`}>
                                {'+'}
                            </Button>
                            <div class="card" style={{ border: '1px #1a1a1a'}}>
                                <div class="card-header p-0 pl-1 align-right">{day.dayDate}</div>
                                <div class="card-body p-0">
                                    <EventsList
                                        events={day.events} />
                                </div>
                            </div>
                        
                    </div>
                    <Modal
                        size='lg'
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        aria-labelledby='addEvent-modal'>
        
                        <Modal.Header closeButton>
                            <Modal.Title id='addEvent-modal'>
                                <h3 class="m-0 p-0">New Event</h3>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddEventForm
                                eventDateIn={day.boxKey}
                            />
                        </Modal.Body>
                    </Modal>
                </>
                )}
                
                </>
            ))}
        </>
    );
};

export default Week;