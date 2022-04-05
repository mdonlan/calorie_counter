import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { get_data_from_db, get_item } from '../api'
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
import { Create_User_Food } from './Create_User_Food';

export function App() {

    const logged_in = useSelector(state => state.default.logged_in);

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
                {logged_in &&
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/food" component={Food} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/weekly_chart" component={Weekly_Chart} />
                        <Route path="/create_user_food" component={Create_User_Food} /> 
                    </Switch>
                }
                {!logged_in &&
                    <Login_Or_Register />
                }
            </Router>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    color: ${props => props.theme.font.main};
`