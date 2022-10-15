import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import events from 'inquirer/lib/utils/events';

const DayBox = ({
    dayDate, 
    events,
    showDescription = true,
    showDescPreview = true,
    //showEventDate = true,
}) => {
    if (dayDate.getDate() === 0) {
        return (
            <Col></Col>
        );
    }

    return (
        <Link to={`/days/dayDate`}>
            <Col key={dayDate.getTime()}>
                <div className="card">
                    <h4 className="card-header bg-primary">
                        {dayDate.getDate()}
                    </h4>
                    {events && events.map((event) => (
                        <Container className="card-body">
                            <Row>
                                <p>{event.eventTitle}</p>
                            </Row>
                        </Container>
                    ))}
                </div>
            </Col>
        </Link>
    );
};

export default DayBox;