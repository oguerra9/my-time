import React from 'react';

const EventsList = ({ events = [] }) => {
    if (!events.length) {
        <p></p>
    }

    return (
        <>
            <div className="p-0 m-0 display-inline-block">
                {events && events.map((myEvent) => (
                    <div key={myEvent._id} className="m-1">
                        <p class="m-0">{myEvent.eventTitle}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EventsList;