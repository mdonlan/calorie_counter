import React, { useState } from 'react'
import { Login } from './Login'
import { Register } from './Register'
import styled from 'styled-components';

export function Login_Or_Register() {

    const [show_login, set_show_login] = useState(true);

    return (
        <Wrapper>
            <Top>
                <Button active={show_login} onClick={() => set_show_login(true)}>Login</Button>
                <Button active={!show_login} onClick={() => set_show_login(false)}>Register</Button>
            </Top>
            <Bottom>
                {show_login &&
                    <Login />
                }
                {!show_login &&
                    <Register />
                }
            </Bottom>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    padding-top: 50px;
    // width: 50%;
`

const Top = styled.div`
    // height: 150px;
    display: flex;
    width: 100%;
`

const Bottom = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
    width: 100%;
`

const Button = styled.div<{active: boolean}>`
    background: ${props => props.active ? "#444444" : "#222222"};
    padding: 5px;
    cursor: pointer;
    width: 50%;
    text-align: center;

    :hover {
        background: ${props => props.active ? "#444444" : "#555555"};
    }
`