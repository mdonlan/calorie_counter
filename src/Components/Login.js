import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {login} from '../api'
import { useHistory } from 'react-router-dom';

export function Login(props) {
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
                <Styled_Input onChange={e => {set_username(e.target.value)}} value={username} placeholder='username'></Styled_Input>
                <Styled_Input onChange={e => {set_password(e.target.value)}} value={password} placeholder='password' type='password'></Styled_Input>
                <Login_Btn onClick={(e) => handle_submit(e)} onSubmit={(e) => handle_submit(e)}>Login</Login_Btn>
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

const Login_Btn = styled.div`
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    background: #333333;

    :hover {
        background: #444444;
    }
`