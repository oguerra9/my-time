import React from 'react';

const EventsList = ({ events = [] }) => {
    if (!events.length) {
        <p></p>
    }

    return (
        <>
            <div className="p-5 display-inline-block">
                {events && events.map((myEvent) => (
                    <div key={myEvent._id} className="col-12 mb-3 pb-3">
                        <div className="p-3 bg-dark text-light">
                            <h5>{myEvent.eventTitle}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EventsList;