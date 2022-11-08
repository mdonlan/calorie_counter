import React, { useState } from 'react'
import styled from 'styled-components'
import { Daily_Calorie_Bar } from './Daily_Calories_Bar'
import { Daily_Log } from './Daily_Log'
import { Macro_Chart } from './Macro_Chart'
import { Weight } from './Weight'
import {Login_Or_Register} from './Login_Or_Register'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export function Home() {
    const logged_in = useSelector((state: RootState) => state.default.logged_in);

    return(
        <Wrapper>
            {logged_in &&
                <>
                <Main_Content>
                    <Daily_Log />
                </Main_Content>
                <Secondary_Content>
                    <Weight />
                    <Daily_Calorie_Bar />
                    <Macro_Chart />
                </Secondary_Content>
                </>
            }
            {!logged_in &&
                <Login_Or_Register />
            }
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