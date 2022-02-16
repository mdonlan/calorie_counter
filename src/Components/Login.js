import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {login} from '../api'

export function Login() {
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const logged_in = useSelector(state => state.default.logged_in);

    async function handle_submit(data) {
        const result = await login(data);
        console.log(result)
    }

    return (
        <Wrapper>
            <Form>
                <input onChange={e => {set_username(e.target.value)}} value={username} placeholder='username'></input>
                <input onChange={e => {set_password(e.target.value)}} value={password} placeholder='password' type='password'></input>
                <div onClick={() => {handle_submit({ username: username, password: password })}}>login</div>
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