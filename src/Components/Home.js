import React from 'react'
import { Search } from './Search'
import { Log } from './Log'
import { Add_Food } from './Add_Food'
import { Weekly_Chart } from './Weekly_Chart'

export function Home() {

    return(
        <div>
            <React.Fragment>
                <Log />
                <Weekly_Chart />
            </React.Fragment>
            {/* <Search /> */}
            
            {/* <Add_Food /> */}
        </div>
    )
}