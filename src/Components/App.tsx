import React, { useEffect } from 'react'
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
// import { get_data_from_db } from '../api'
import styled from 'styled-components'
// import { Search } from './Search'
// import { Log } from './Daily_Log'
import { Home } from './Home'
import { Food } from './Food'
import Top_Nav from './Top_Nav'
import { Register } from './Register'
import { Login } from './Login'
import { validate_token, check_for_token } from '../api'
import { useSelector } from 'react-redux';
import { Login_Or_Register } from './Login_Or_Register';
import { Weekly_Chart } from './Weekly_Chart';
// import { Create_User_Food } from './Create_User_Food';
import { RootState } from '../store';

export function App() {

    const logged_in = useSelector((state: RootState) => state.default.logged_in);

    useEffect(() => {
        const token = check_for_token();
        if (token) {
            validate_token(token);
        } else {
            console.log("NO TOKEN STORED");
        }
        // get_data_from_db();
    }, [logged_in])

    return (
        <Wrapper>
            <Router>
                <Top_Nav />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/food" component={Food} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/weekly_chart" component={Weekly_Chart} />
                    {/* <Route path="/create_user_food" component={Create_User_Food} />  */}
                </Switch>
            </Router>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    color: ${props => props.theme.color};
    background: ${props => props.theme.background};
    height: 100%;
    overflow-y: auto;
`