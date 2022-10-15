export const getSavedEvents = () => {
    const savedEvents = localStorage.getItem('saved_events')
      ? JSON.parse(localStorage.getItem('saved_events'))
      : [];
  
    return savedEvents;
};
  
// testing here


export const saveEvent = (eventArr) => {
    if (eventArr.length) {
      localStorage.setItem('saved_events', JSON.stringify(eventArr));
    } else {
      localStorage.removeItem('saved_events');
    }
};
  
export const removeEvent = (eventId) => {
    const savedEvents = localStorage.getItem('saved_events')
      ? JSON.parse(localStorage.getItem('saved_events'))
      : null;
  
    if (!savedEvents) {
      return false;
    }
  
    let updatedSavedEvents = [];

    if (savedEvents) {
      updatedSavedEvents = savedEvents.filter((savedEvent) => savedEvent._id !== eventId);
    }
    localStorage.setItem('saved_events', JSON.stringify(updatedSavedEvents));
  
    return true;
};
  