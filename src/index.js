import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { get_data_from_db, get_item } from './api'
import { Search } from './Components/Search'
import { Log } from './Components/Log'
import { Home } from './Home'
import { Food } from './Food'

function App() {

    useEffect(() => {
        // get_data_from_db();
    }, [])

    return (
        <Router>
            {/* <Search /> */}
            {/* <Log /> */}
            <Switch>
                <Route path="/" exact component={Home} /> 
                <Route path="/food" component={Food} /> 
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));