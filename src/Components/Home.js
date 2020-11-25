import React from 'react'
import { Search } from './Search'
import { Log } from './Log'
import { Add_Food } from './Add_Food'

export function Home() {
    return(
        <div>
            <div>home</div>
            <Search />
            <Log />
            <Add_Food />
        </div>
    )
}