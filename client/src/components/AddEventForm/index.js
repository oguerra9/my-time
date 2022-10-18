import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_EVENT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

import { Form, Button, Alert } from 'react-bootstrap'; 

import { addMyEvent, getMyEvents } from '../../utils/localStorage';

import Auth from '../../utils/auth';

const AddEventForm = ({ eventDateIn }) => {
  const { loading, data } = useQuery(QUERY_ME);
  let userData = {};

  const eventDateObj = new Date(parseInt(eventDateIn));
  let monthNum = eventDateObj.getMonth() + 1;
  let dateNum = eventDateObj.getDate();
  let yearNum = eventDateObj.getFullYear();
  //const userIdNum = parseInt(userData._id);
  //const eventIdNum = userIdNum + userData.eventCount;
  let eventIdString = "";
  const eventCountString = JSON.stringify(userData.eventCount);
  const userIdString = JSON.stringify(userData._id);
  eventIdString = userIdString + eventCountString;


  eventIdString = "placeholder";


  const [eventFormData, setEventFormData] = useState({ eventId: eventIdString, eventDate: eventDateIn, eventTitle: '', eventDescription: '' });
  const [myEvents, setMyEvents] = useState([]);

  if (data) {
    userData = data.me;
  }
  
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  //const [addEvent, { error }] = useMutation(ADD_EVENT);
  const [addEvent, { error }] = useMutation(ADD_EVENT, {
    update(cache, { data: { addEvent } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        //const { events } = me.events;

        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, events: [...me.events, addEvent] } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    const eventTitle = eventFormData.eventTitle;
    const eventDescription = eventFormData.eventDescription;

    event.preventDefault();

    try {
      const { data } = await addEvent({
        variables: {
          eventIdString,
          eventDateIn, 
          eventTitle, 
          eventDescription,
        },
      });

      setEventFormData({
        eventId: '',
        eventDate: '',
        eventTitle: '',
        eventDescription: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventFormData({ ...eventFormData, [name]: value });
  };

  /*
  return (
    <div>
      <h3>Add Event</h3>

      {Auth.loggedIn() ? (
        <>
          <form 
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="eventTitle"
                placeholder="Title"
                value={eventFormData.eventTitle}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <textarea
                name="eventDescription"
                placeholder="Description"
                value={eventFormData.eventDescription}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Event
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/">Get Started</Link>.
        </p>
      )}
    </div>
  );
*/
  
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong adding your event
        </Alert>

        {eventDateIn ? (
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