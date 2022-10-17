import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import MyMonth from './pages/MyMonth';
import MyDay from './pages/MyDay';
import MyWeek from './pages/MyWeek';
//import Home from './components/Home';
import GetStarted from './components/GetStarted';
import Navbar from './components/NavBar';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header';
import Footer from './components/Footer';

import Auth from './utils/auth';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const currDate = new Date();
const currTime = currDate.getTime();
// space used to contain "<Header />"
function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="flex-column justify-flex-start min-100-vh">
                    
                    <div className="container">
                        <Navbar />
                        <Routes>
                            {Auth.loggedIn() ? (
                                <Route
                                path='/'
                                element={<MyDay />}
                                />
                            ) : (
                                <Route 
                                path='/'
                                element={<GetStarted />}
                                />
                            )}
                            <Route
                                path='/myMonth/:currTime'
                                element={<MyMonth />}
                            />
                            <Route  
                                path='/myWeek/:currTime'
                                element={<MyWeek />}
                            />
                            <Route
                                path="/myDay/:currTime"
                                element={<MyDay />}
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;