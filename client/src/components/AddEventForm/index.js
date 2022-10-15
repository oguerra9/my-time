import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';

import {useMutation} from '@apollo/client';
import {ADD_EVENT} from '../../utils/mutations';

//import Auth from '../../utils/auth';

const AddEventForm = ({
  eventDate,
}) => {
  console.log("----- Event Date: ----- AddEventForm");
  console.log(eventDate);
  const myDate = new Date(eventDate);
  // set initial form state
  const [eventFormData, setEventFormData] = useState({ eventUser: '', eventDate: '', eventTitle: '', eventDescription: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addEvent, {error}] = useMutation(ADD_EVENT);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error])

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setEventFormData({ ...eventFormData, [name]: value });
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const {data} = await addEvent({
        variables: { ...eventFormData },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setEventFormData({
      //eventUser: '',
      eventDate: '',
      eventTitle: '',
      eventDescription: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your event
        </Alert>

        {eventDate ? (
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
        
          {/* <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback> */}
        
        <Form.Group>
          <Form.Label htmlFor='eventTitle'>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Title'
            name='eventTitle'
            value={eventFormData.eventTitle}
            required
          />
          <Form.Control.Feedback type='invalid'>Title is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='eventDescription'>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Description'
            name='eventDescription'
    
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
    </>
  );
};

export default AddEventForm;
