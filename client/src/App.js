import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import Day from './pages/Day';
import Month from './pages/Month';
import MyDay from './pages/MyDay';
import Week from './pages/Week';
import Home from './pages/Home';
import Navbar from './components/NavBar';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header';
import Footer from './components/Footer';

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
const currTime = (currDate.now()).getTime();
// space used to contain "<Header />"
function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="flex-column justify-flex-start min-100-vh">
                    
                    <div className="container">
                        <Navbar />
                        <Routes>
                            <Route
                                path='/'
                                element={<Home />}
                            />
                            <Route
                                path={`/month/${currTime}`}
                                element={<Month />}
                            />
                            <Route  
                                path={`/week/${currTime}`}
                                element={<Week />}
                            />
                            <Route
                                path={`/myDay/${currTime}`}
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