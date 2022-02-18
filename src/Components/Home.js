import React from 'react'
import { Daily_Log } from './Daily_Log'

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