import React from 'react'
import { Search } from './Search'
import { Daily_Log } from './Daily_Log'
import { Add_Food } from './Add_Food'
import { Weekly_Chart } from './Weekly_Chart'

export function Home() {

    return(
        <div>
            <React.Fragment>
                <Daily_Log />
                {/* <Weekly_Chart /> */}
            </React.Fragment>
            {/* <Search /> */}
            
            {/* <Add_Food /> */}
        </div>
    )
}