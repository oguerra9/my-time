import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import Day from './pages/Day';
import Month from './pages/Month';
import MyDay from './pages/MyDay';
import Week from './pages/Week';
import Navbar from './components/NavBar';
import { setContext } from '@apollo/client/link/context';

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

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <>
                    <Navbar />
                    <Routes>
                        <Route
                            path='/myDay'
                            element={<MyDay />}
                        />
                        <Route
                            path='/month'
                            element={<Month />}
                        />
                        <Route  
                            path='/week'
                            element={<Week />}
                        />
                        <Route
                            path='/day'
                            element={<Day />}
                        />
                    </Routes>
                </>
            </Router>
        </ApolloProvider>
    );
}

export default App;