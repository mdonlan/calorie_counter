import React from 'react'
import styled from 'styled-components'
import { Daily_Calorie_Bar } from './Daily_Calories_Bar'
import { Daily_Log } from './Daily_Log'
import { Macro_Chart } from './Macro_Chart'
import { Weight } from './Weight'

export function Home() {
    return(
        <Wrapper>
            <Main_Content>
                <Daily_Log />
            </Main_Content>
            <Secondary_Content>
                <Weight />
                <Daily_Calorie_Bar />
                <Macro_Chart />
            </Secondary_Content>
        </Wrapper>
    )
} 

const Wrapper = styled.div`
    overflow: auto;
    display: flex;
    justify-content: center;

    @media (max-width: 800px) {
        flex-direction: column;
    }
    
`

const Main_Content = styled.div``

const Secondary_Content = styled.div``