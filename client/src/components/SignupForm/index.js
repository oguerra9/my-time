import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const SignupForm = () => {
    const [userFormData, setUserFormData] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addUser, { error }] = useMutation(ADD_USER);

    useEffect(() => {
        if (error) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [error]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await addUser({
                variables: { ...userFormData },
            });

            console.log(data);
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }

        setUserFormData({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert
                    dismissible
                    onCLose={() => setShowAlert(false)}
                    show={showAlert}
                    variant="danger"
                >
                    Something went wrong
                </Alert>
                <Form.Group>
                    <Form.Label htmlFor="firstName">First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleInputChange}
                        value={userFormData.firstName}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        First name is required
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="lastName">Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleInputChange}
                        value={userFormData.lastName}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Last name is required
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Username is required
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Email is required
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Password"
                        name="password"
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Password is required
                    </Form.Control.Feedback>
                </Form.Group>
                <Button
                    disabled={!(userFormData.firstName && userFormData.lastName && userFormData.username && userFormData.email && userFormData.password)}
                    type="submit"
                    variant="success"
                >
                    Sign Up
                </Button>
            </Form>
        </>
    );
};

export default SignupForm;