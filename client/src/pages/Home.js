import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';

import Auth from '../utils/auth';

const Home = () => {

    const [showModal, setShowModal] = useState(false);

    const currDate = new Date();
    const currTime = currDate.getTime();

    const myDayNav = (event) => {
        event.preventDefault();

        const currDate = new Date();
        const currTime = currDate.getTime();
        return <Navigate to={`/myDay/${currTime}`} />;
    };

    return (
        <>
        <div className="jumbotron text-light bg-dark flex-row justify-content-center align-center p-3">
            <h1>Get Started with MyTime</h1>
        </div>
        <p class="ml-5">Welcome to your digital agenda. Use MyTime to track your scheduled events.</p>
        {Auth.loggedIn() ? (
            <Link to={`/myDay/${currTime}`}>
                <Button>
                    See myDay
                </Button>
                
            </Link>
        ) : (
            <>
                <div class="m-5 mt-1">
                    <Button onClick={() => setShowModal(true)} class="ml-5">Login/Sign Up</Button>
                </div>
                
                <Modal
                    size='lg'
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    aria-labelledby='signup-modal'>
                    {/* tab container to do either signup or login component */}
                    <Tab.Container defaultActiveKey='login'>
                    <Modal.Header closeButton>
                        <Modal.Title id='signup-modal'>
                        <Nav variant='pills'>
                            <Nav.Item>
                            <Nav.Link eventKey='login'>Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tab.Content>
                        <Tab.Pane eventKey='login'>
                            <LoginForm handleModalClose={() => setShowModal(false)} />
                        </Tab.Pane>
                        <Tab.Pane eventKey='signup'>
                            <SignupForm handleModalClose={() => setShowModal(false)} />
                        </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>
                    </Tab.Container>
                </Modal>
            </>
        )}
        </>
    );
    
};

export default Home;
