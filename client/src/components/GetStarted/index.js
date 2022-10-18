import React from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, BrowserRouter as Router, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';

const GetStarted = () => {

    const currDate = new Date();
    const currTime = currDate.getTime();

    const myDayNav = (event) => {
        event.preventDefault();

        const currTime = new Date();
        const timeParam = currTime.getTime();
        return <Navigate to={`/myDay/${timeParam}`} />;
    };

    // was in space below:
    /*
        {Auth.loggedIn() ? (
                    <Link to={`myDay/${currTime}`}>
                        <button>See MyDay</button>
                    </Link>
                ) : (

                )}
    */

    return (
            <div>
                <h1 className="m-4">Get Started with MyTime</h1>
                
                <Button className="btn btn-lg btn-light m-2" onClick={myDayNav}>
                    See MyDay
                </Button>
            </div>
    );
};

export default GetStarted;
