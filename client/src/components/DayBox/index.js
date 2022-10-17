import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import events from 'inquirer/lib/utils/events';

const DayBox = ({
    dayDate, 
    events,
    showDescPreview = true,
}) => {
    if (dayDate.getDate() === 0) {
        return (
            <Col></Col>
        );
    }

    return (
        <Card className='square border border-dark'>
            <Card.Title>
                {dayDate}
            </Card.Title>
            {showDescPreview ? (
                <Card.Body>
                    {events && events.map((event) => (
                        <Row>
                            <Row>
                                {event.eventTitle}
                            </Row>
                            <Row>
                                {((event.eventDescription.length) > 50) ? (
                                    <Row>{(event.eventDescription).substring(0,49)}...</Row>
                                ) : (
                                    <Row>{(event.eventDescription)}</Row>
                                )}
                            </Row>
                        </Row>
                    ))}
                </Card.Body>    
            ) : (
                <Card.Body>
                    {events && events.map((event) => (
                        <Row>
                            {event.eventTitle}
                        </Row>
                    ))}
                </Card.Body>  
            )}
        </Card>
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