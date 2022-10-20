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
                <>
                {day.dayDate == 0 ? (
                    <div key={day.boxKey} class="border border-secondary" style={{width: '14%', height: '144px'}}>
                        <div class="card" style={{ border: '1px #1a1a1a'}}>
                            <p> </p>
                        </div>
                    </div>
                ) : ( 
                    <div key={day.boxKey} class="border border-secondary" style={{width: '14%', height: '144px'}}>
                        <Link to={`/myDay/${parseInt(day.boxKey)}`}>
                            <div class="card" style={{ border: '1px #1a1a1a'}}>
                                <div class="card-header p-0 pl-1 align-right">{day.dayDate}</div>
                                <div class="card-body p-0">
                                    <EventsList
                                        events={day.events} />
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
                
                </>
            ))}
        </>
    );
};

export default Week;