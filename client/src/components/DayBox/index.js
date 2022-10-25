import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
//import events from 'inquirer/lib/utils/events';
import AddEventForm from '../AddEventForm';
import EventsList from '../EventsList';

const DayBox = ({
    boxKey,
    dayDate, 
    events
}) => {

    const [showModal, setShowModal] = useState(false);

    if (dayDate === 0) {
        return (
            <Col></Col>
        );
    }

    return (
            <>
                {dayDate === 0 ? (
                    <div class="border border-secondary" style={{width: '14%', height: '144px', borderStyle: 'solid' }}>
                        <div class="card" style={{ border: '1px #1a1a1a'}}>
                            <p> </p>
                        </div>
                    </div>
                ) : ( 
                    <>
                        <div class="border border-secondary" style={{width: '14%', height: '144px'}}>
                            <div class="card" style={{ border: '1px #1a1a1a'}}>
                                <div class="card-header p-0 pl-1 d-flex justify-content-between">
                                    <Button onClick={() => setShowModal(true)} id={`boxKey`} style={{ width: '20px', height: '20px', margin: '0px', padding: '0px' }}>
                                        {'+'}
                                    </Button>
                                    <p class="p-0 m-0">{dayDate}</p>
                                </div>
                                <div class="card-body p-0">
                                    <EventsList
                                        events={events} />
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
                                    eventDateIn={boxKey}
                                />
                            </Modal.Body>
                        </Modal>
                    </>
                    )}
                    
                </>
    );

    // return (
    //     <Link to={`/days/${dayDate}`}>
    //         <Col key={dayDate.getTime()}>
    //             <div className="card">
    //                 <h4 className="card-header bg-primary">
    //                     {dayDate.getDate()}
    //                 </h4>
    //                 {events && events.map((event) => (
    //                     <Container className="card-body">
    //                         <Row>
    //                             <p>{event.eventTitle}</p>
    //                         </Row>
    //                     </Container>
    //                 ))}
    //             </div>
    //         </Col>
    //     </Link>
    // );
};

export default DayBox;