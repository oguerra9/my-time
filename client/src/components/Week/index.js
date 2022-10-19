import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
//import events from 'inquirer/lib/utils/events';
import DayBox from '../DayBox';
import EventsList from '../EventsList';

const Week = ({
    days,
}) => {

    return (
        <>
            {days && days.map((day) => (
                <div key={day.boxKey} class="border border-secondary" style={{width: '14%', height: '144px'}}>
                    <div class="card" style={{ border: '1px #1a1a1a'}}>
                        <div class="card-header p-0 pl-1 align-right">{day.dayDate}</div>
                        <div class="card-body">
                            <EventsList
                                events={day.events} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
    
    // return (
    //     <Row className="square border border-primary">
    //         {days && days.map((day) => (
    //             <Col key={day.boxKey} className="square border border-primary">
    //                 <Card style={{ border: '1px #1a1a1a'}}>
    //                     <Card.Title>{day.dayDate}</Card.Title>
    //                     <Card.Body>
    //                         <EventsList
    //                             events={day.events} />
    //                     </Card.Body>
    //                 </Card>
    //             </Col>
    //         ))}
    //     </Row>
    // );
    
    // return (
    //     <>
    //         {days && days.map((day) => {
    //             <td key={day.boxKey}>
    //                 <Card style={{ border: '1px #1a1a1a'}}>
    //                     <Card.Title>{day.dayDate}</Card.Title>
    //                     <Card.Body>
    //                       <EventsList
    //                          events={day.events} />
    //                     </Card.Body>
    //                 </Card>
    //             </td>
    //         })}
    //     </>
    // )

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