import React, { useState } from 'react'
import { Login } from './Login'
import { Register } from './Register'
import styled from 'styled-components';

export function Login_Or_Register() {

    const [show_login, set_show_login] = useState(true);

    return (
        <Wrapper>
            {show_login &&
                <Login />
            }
            {!show_login &&
                <Register />
            }

            {/* <div onClick={() => {set_show_login(true)}}>login</div>
            <div onClick={() => {set_show_login(false)}}>register</div> */}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding-top: 50px;
`