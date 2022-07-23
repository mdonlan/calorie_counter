import React from 'react'
import styled from 'styled-components'
import { Daily_Calorie_Bar } from './Daily_Calories_Bar'
import { Daily_Log } from './Daily_Log'
import { Macro_Chart } from './Macro_Chart'
import { Weight } from './Weight'

export function Home() {

    return(
        <Wrapper>
            {/* <React.Fragment> */}
                <Main_Content>
                    <Daily_Log />
                </Main_Content>
                <Right>
                    <Weight />
                    <Daily_Calorie_Bar />
                    <Macro_Chart />
                </Right>
                {/* <Weekly_Chart /> */}
            {/* </React.Fragment> */}
            {/* <Search /> */}
            
            {/* <Add_Food /> */}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    overflow: auto;
    display: flex;
    justify-content: center;
`

const Main_Content = styled.div``

const Right = styled.div``