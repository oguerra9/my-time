import React from 'react';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';

const Home = () => {

    const myDayNav = (event) => {
        event.preventDefault();

        const currDate = new Date();
        const currTime = currDate.getTime();
        return <Navigate to={`/myDay/${currTime}`} />;
    };

    return (
            <div>
                <h1>Get Started with MyTime</h1>
                <Button className="btn btn-lg btn-light m-2" onClick={myDayNav}>
                    See MyDay
                </Button>
            </div>
    );
};

export default Home;
