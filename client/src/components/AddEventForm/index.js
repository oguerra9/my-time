import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
import { ADD_EVENT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const AddEventForm = ({
  eventDate,
}) => {
  console.log("----- Event Date ----- AddEventForm");
  console.log(eventDate);

  let myDate = new Date (parseInt(eventDate));
  let monthNum = myDate.getMonth() + 1;
  let dateNum = myDate.getDate();
  let yearNum = myDate.getFullYear();
  let myTime = myDate.getTime();

  const [eventFormData, setEventFormData] = useState({ eventUser: '', eventDate: myDate, eventTitle: '', eventDescription: ''});

  const { loading, data } = useQuery(QUERY_ME);
  const userData = {};

  if (data) {
    console.log('user data found');
    userData = data.me;
    console.log(userData);
    setEventFormData({ ...eventFormData, eventUser: userData.username });
  }
  if (eventDate) {
    console.log('eventDate found');
    console.log(eventDate);
    setEventFormData({ ...eventFormData, eventDate: myDate });
  }

  const [validated] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [addEvent, {error}] = useMutation(ADD_EVENT);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventFormData({ ... eventFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation(); 
    }

    try {
      const {data} = await addEvent({
        variables: { 
          eventUser: eventFormData.eventUser,
          eventDate: myTime,
          eventTitle: eventFormData.eventTitle,
          eventDescription: eventFormData.eventDescription,
         },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    if (eventDate) {
      setEventFormData({
        eventUser: userData.username,
        eventDate: myDate,
        eventTitle: '',
        eventDescription: '',
      });
    } else {
      setEventFormData({
        eventUser: userData.username,
        eventDate: '',
        eventTitle: '',
        eventDescription: '',
      });
    }
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong adding your event
        </Alert>

        {eventDate ? (
          <div>
            <h3>Event Date</h3>
            <p>{monthNum}/{dateNum}/{yearNum}</p>
          </div>
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
          disabled={!(eventFormData.title)}
          type='submit'
          variant='success'
          onClick={handleFormSubmit}>
            Add Event
        </Button>
      </Form>
    </div>
  );
};

export default AddEventForm;