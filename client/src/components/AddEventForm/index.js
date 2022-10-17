import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
import { ADD_EVENT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
import { saveEvents, getSavedEvents } from '../../utils/localStorage';

const AddEventForm = ({
  eventDate,
}) => {
  const { loading, data } = useQuery(QUERY_ME);
  let userData = {};

  console.log('----- Event Date: ----- AddEventForm');
  console.log(eventDate);
  
  const userIdNum = parseInt(userData._id);
  const eventIdNum = userIdNum + userData.eventCount;

  const [eventFormData, setEventFormData] = useState({ eventId: eventIdNum, eventDate: eventDate, eventTitle: '', eventDescription: ''});

  const [savedEvents, setSavedEvents] = useState([]);

  if (data) {
    console.log('AddEventForm ----- line 20');
    userData = data.me;
    //setEventFormData({ ...eventFormData });
  } 
  // if (eventDate) {
  //   console.log('AddEventForm ----- line 25');
  //   setEventFormData({ ...eventFormData, eventDate: eventDate });
  // }

  const [validated] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [addEvent, { error }] = useMutation(ADD_EVENT);

  // const [addEvent, { error }] = useMutation(ADD_EVENT, {
  //   update(cache, { data: { addEvent } }) {
  //     try {
  //       const { events } = cache.readQuery({ query: QUERY_ME});
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // });

  useEffect(() => {
    if (error) {
      console.log('AddEventForm ----- line 37');
      setShowAlert(true);
    } else {
      console.log('AddEventForm ----- line 40');
      setShowAlert(false);
    }
  }, [error])

  const handleInputChange = (event) => {
    console.log('handleInputChange called ----- AddEventForm');
    const { name, value } = event.target;
    setEventFormData({ ...eventFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('handleFormSubmit called ----- AddEventForm');

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('checkValidity = false ----- AddEventForm');
      event.preventDefault();
      event.stopPropagation();
    }

    handleSaveEvent();

    setEventFormData({
      eventDate: '',
      eventTitle: '',
      eventDescription: '',
    });
  };

  const handleSaveEvent = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addEvent({
        variables: { ...eventFormData },
      });
      console.log(savedEvents);
      setSavedEvents([...savedEvents, eventFormData]);

      window.location.reload();
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  let myDate = new Date (parseInt(eventDate));
  let monthNum = myDate.getMonth() + 1;
  let dateNum = myDate.getDate();
  let yearNum = myDate.getFullYear();
  let myTime = myDate.getTime();

  console.log('AddEventForm ----- line 84');


  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setEventFormData({ ... eventFormData, [name]: value });
  // };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   const form = event.currentTarget;

  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation(); 
  //   }

  //   try {
  //     const {data} = await addEvent({
  //       variables: { 
  //         eventDate: myTime,
  //         eventTitle: eventFormData.eventTitle,
  //         eventDescription: eventFormData.eventDescription,
  //        },
  //     });
  //     console.log(data);
  //   } catch (err) {
  //     console.error(err);
  //     setShowAlert(true);
  //   }

  //   if (eventDate) {
  //     setEventFormData({
  //       eventDate: myDate,
  //       eventTitle: '',
  //       eventDescription: '',
  //     });
  //   } else {
  //     setEventFormData({
  //       eventDate: '',
  //       eventTitle: '',
  //       eventDescription: '',
  //     });
  //   }
  // };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong adding your event
        </Alert>

        {eventDate ? (
          <Form.Text>
            <h3>Event Date</h3>
            <p>{monthNum}/{dateNum}/{yearNum}</p>
          </Form.Text>
        ) : (
          <Form.Group>
            <Form.Label htmlFor='eventDate'>Event Date</Form.Label>
            <Form.Control
              type='date'
              placeholder='date'
              name='eventDate'
              onChange={(e) => setImmediate(e.target.value)}
              value={eventFormData.eventDate}
            />
          </Form.Group>
        )}

        <Form.Group>
          <Form.Label htmlFor='eventTitle'>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Title'
            name='eventTitle'
            value={eventFormData.eventTitle}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type='invalid'>Title is required</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='eventDescription'>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Description'
            name='eventDescription'
            onChange={handleInputChange}
            value={eventFormData.eventDescription}
          />
        </Form.Group>
        <Button
          type='submit'
          variant='success'>
            Add Event
        </Button>
      </Form>
    </>
  );
};

export default AddEventForm;