import React from 'react';

const EventsList = ({ events = [] }) => {
    if (!events.length) {
        <p></p>
    }

    return (
        <>
            <div className="p-0 m-0 display-inline-block">



                {events && events.map((myEvent) => (
                    <div key={myEvent._id} className="col-12 mb-1 pb-1">
                        <div className="bg-dark text-light">
                            <p class="m-0 p-0">{myEvent.eventTitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EventsList;