import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { get_data_from_db, get_item } from '../api'
import styled from 'styled-components'
import { Search } from './Search'
import { Log } from './Log'
import { Home } from './Home'
import { Food } from './Food'
import { Top_Nav } from './Top_Nav'
import { Register } from './Register'
import { Login } from './Login'
import { validate_token } from '../api'
import { useSelector } from 'react-redux';

export function App() {

    const logged_in = useSelector(state => state.default.logged_in);

    useEffect(() => {
        console.log('logged_in: ' + logged_in)
        const token = localStorage.getItem("token");
        if (token) {
            validate_token(token);
        }
        // get_data_from_db();
    }, [logged_in])

    return (
        <Wrapper>
            <Router>
                {/* <Search /> */}
                {/* <Log /> */}
                <Top_Nav />
                <Switch>
                    <Route path="/" exact component={Home} /> 
                    <Route path="/food" component={Food} /> 
                    <Route path="/register" component={Register} /> 
                    <Route path="/login" component={Login} /> 
                </Switch>
            </Router>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    color: ${props => props.theme.font.main};
`