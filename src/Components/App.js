import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { get_data_from_db, get_item } from '../api'
import { Search } from './Search'
import { Log } from './Log'
import { Home } from './Home'
import { Food } from './Food'
import { Top_Nav } from '../Top_Nav'
import { Register } from './Register'
import { Login } from './Login'

export function App() {

    useEffect(() => {
        // get_data_from_db();
    }, [])

    return (
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
    )
}