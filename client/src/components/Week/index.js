import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import events from 'inquirer/lib/utils/events';
import DayBox from '../DayBox';

const Week = ({
    days, 
    monthView = true,
}) => {


    return (
        <Container square border border-primary>
            {monthView ? (
                <Row>
                    <Col>Week</Col>
                    {days && days.map((day) => (
                        <Col>
                            <DayBox 
                                dayDate={day.dayDate}
                                events={day.events}
                                showDescPreview={false} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Row>
                    {days && days.map((day) => (
                        <Col>
                            <DayBox
                                dayDate={day.dayDate}
                                events={day.events}
                                showDescPreview={true} />
                        </Col>
                    ))}
                </Row>
            )}
                
        </Container>
    );

    // return (
    //     <div>
    //         {monthView ? (
    //             <Row>
    //                 <Link to={`/myWeek/${weekStart}`}>
    //                     <Col>week</Col>
    //                 </Link>
    //                 {days && days.map((day) => (
    //                     <DayBox
    //                         dayDate={day.dayDate}
    //                         events={day.events}

    //                         showDescPreview={false}
    //                     />
    //                 ))}
    //             </Row>
    //         ) : (
    //             <Row>
    //                 {days && days.map((day) => (
    //                     <DayBox
    //                         dayDate={day.dayDate}
    //                         events={day.events}
    //                         showDescPreview={true}
    //                     />
    //                 ))}
    //             </Row>
    //         )}   
    //     </div>          
    // );
};

export default Week;