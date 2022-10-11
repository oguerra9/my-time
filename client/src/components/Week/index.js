import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import events from 'inquirer/lib/utils/events';
import DayBox from '../DayBox';

const Week = ({
    days, 
    weekStart,
    monthView = true,
}) => {

    return (
        <div>
            {monthView ? (
                <Row>
                    <Link to={`/week/${weekStart}`}>
                        <Col>week</Col>
                    </Link>
                    {days && days.map((day) => (
                        <DayBox
                            dayDate={day.dayDate}
                            events={day.events}
                            showDescription={false}
                            showDescPreview={false}
                            showEventTime={true}
                        />
                    ))}
                </Row>
            ) : (
                <Row>
                    {days && days.map((day) => (
                        <DayBox
                            dayDate={day.dayDate}
                            events={day.events}
                            showDescription={false}
                            showDescPreview={true}
                            showEventTime={true}
                        />
                    ))}
                </Row>
            )}   
        </div>          
    );
};

export default Week;