// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';

const Home = () => {

    const myDayNav = (event) => {
        event.preventDefault();

        const currTime = new Date();
        const timeParam = currTime.getTime();
        return <Navigate to={`/myDay/${timeParam}`} />;
    };

    return (
            <div>
                <h1>Get Started with MyTime</h1>
                <button className="btn btn-lg btn-light m-2" onClick={myDayNav}>
                    See MyDay
                </button>
            </div>
    );
};

export default Home;
