export const getMyEvents = () => {
  const myEvents = localStorage.getItem('my_events')
      ? JSON.parse(localStorage.getItem('my_events'))
      : [];

  return myEvents;
};

export const addMyEvent = (myEventArr) => {
  if (myEventArr.length) {
      localStorage.setItem('my_events', JSON.stringify(myEventArr));
  } else {
      localStorage.removeItem('my_events');
  }
};




// export const getSavedEvents = () => {
//     const savedEvents = localStorage.getItem('saved_events')
//       ? JSON.parse(localStorage.getItem('saved_events'))
//       : [];
  
//     return savedEvents;
// };

// export const saveEvents = (eventArr) => {
//     if (eventArr.length) {
//       localStorage.setItem('saved_events', JSON.stringify(eventArr));
//     } else {
//       localStorage.removeItem('saved_events');
//     }
// };
  
// // export const removeEvent = (eventId) => {
// //     const savedEvents = localStorage.getItem('saved_events')
// //       ? JSON.parse(localStorage.getItem('saved_events'))
// //       : null;
  
// //     if (!savedEvents) {
// //       return false;
// //     }
  
// //     let updatedSavedEvents = [];

// //     if (savedEvents) {
// //       updatedSavedEvents = savedEvents.filter((savedEvent) => savedEvent._id !== eventId);
// //     }
// //     localStorage.setItem('saved_events', JSON.stringify(updatedSavedEvents));
  
// //     return true;
// // };
  