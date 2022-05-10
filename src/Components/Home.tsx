import React from 'react'
import styled from 'styled-components'
import { Daily_Log } from './Daily_Log'

export function Home() {

    return(
        <Wrapper>
            {/* <React.Fragment> */}
                <Daily_Log />
                {/* <Weekly_Chart /> */}
            {/* </React.Fragment> */}
            {/* <Search /> */}
            
            {/* <Add_Food /> */}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    overflow: auto;
`