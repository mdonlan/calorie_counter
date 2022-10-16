import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {login} from '../api'
import { useHistory } from 'react-router-dom';

export function Login() {
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const logged_in = useSelector(state => state.default.logged_in);
    const history = useHistory();

    async function handle_submit(e) {
        e.preventDefault();
        console.log('handle_submit');
        console.log(username);
        console.log(password);
        let result;
        try {
            result = await login({ username: username, password: password});
        } catch (e) {
            console.log(e);
        }
        console.log(result)
        history.push('/');
        
    }

    return (
        <Wrapper>
            <Form>
                <input onChange={e => {set_username(e.target.value)}} value={username} placeholder='username'></input>
                <input onChange={e => {set_password(e.target.value)}} value={password} placeholder='password' type='password'></input>
                <button 
                    onClick={(e) => handle_submit(e)}
                    onSubmit={(e) => handle_submit(e)}
                    >login</button>
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