import React from 'react';

const Countdown = ({ 
    currDate,
    events = [] 
}) => {
    if (!events.length) {
        <p></p>
    }

    let upcomingEvents = [];

    const getDaysUntil = (eventDate) => {
        const currDateMS = parseInt(currDate);
        const eventDateMS = parseInt(eventDate);
        const timeDiffMS = eventDateMS - currDateMS;
        const numDays = timeDiffMS / 86400000;

        return numDays;
    };

    for (let i = 0; i < events.length; i++) {
        if ( (parseInt(events[i].eventDate) > parseInt(currDate)) && (getDaysUntil(events[i].eventDate) <= 100) ) {
            upcomingEvents.push(events[i]);
        }
    }

    

    return (
        <>
            <div className="p-0 m-0">
                {upcomingEvents && upcomingEvents.map((myEvent) => (
                    <div key={myEvent._id} className="m-1">
                        <p class="m-0">{myEvent.eventTitle} in {getDaysUntil(myEvent.eventDate)} days</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Countdown;