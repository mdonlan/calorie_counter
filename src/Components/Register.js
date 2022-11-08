import React, { useState } from 'react'
import styled from 'styled-components'
import { register_user } from '../api'

export function Register() {
    const [email, set_email] = useState('');
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const [status, set_status] = useState(null);

    async function handle_submit(data) {
        const result = await register_user(data);
        set_status(result);
    }

    return (
        <Wrapper>
            <Form>
                <Styled_Input onChange={e => {set_email(e.target.value)}} value={email} placeholder='email'></Styled_Input>
                <Styled_Input onChange={e => {set_username(e.target.value)}} value={username} placeholder='username'></Styled_Input>
                <Styled_Input onChange={e => {set_password(e.target.value)}} value={password} placeholder='password' type='password'></Styled_Input>
                <Register_Btn onClick={() => {handle_submit({ username: username, email: email, password: password })}}>Register</Register_Btn>

                {status &&
                    <div>{status}</div>
                }
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div``
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Styled_Input = styled.input`
    outline: none;
    background: #333333;
    padding: 5px;
    text-decoration: none;
    border: none;
    color: #dddddd
`

const Register_Btn = styled.div`
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    background: #333333;

    :hover {
        background: #444444;
    }
`