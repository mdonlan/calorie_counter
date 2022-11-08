import React, { useState } from 'react'
import { Login } from './Login'
import { Register } from './Register'
import styled from 'styled-components';

export function Login_Or_Register() {

    const [show_login, set_show_login] = useState(true);

    return (
        <Wrapper>
            <Top>
                {show_login &&
                    <Login />
                }
                {!show_login &&
                    <Register />
                }
            </Top>
            <Bottom>
                <Button active={show_login} onClick={() => set_show_login(true)}>Login</Button>
                <Button active={!show_login} onClick={() => set_show_login(false)}>Register</Button>
            </Bottom>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    padding-top: 50px;
`

const Top = styled.div`
    height: 150px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 15px;
`

const Button = styled.div<{active: boolean}>`
    background: ${props => props.active ? "#444444" : "#222222"};
    padding: 5px;
    cursor: pointer;
`