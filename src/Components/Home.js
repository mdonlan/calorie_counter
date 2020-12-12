import React from 'react'
import { Search } from './Search'
import { Log } from './Log'
import { Add_Food } from './Add_Food'
import { Weekly_Chart } from './Weekly_Chart'

export function Home() {
    return(
        <div>
            {/* <Search /> */}
            <Log />
            <Weekly_Chart />
            {/* <Add_Food /> */}
        </div>
    )
}