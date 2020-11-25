import React, { useState } from 'react'
import { register_user } from '../api'

export function Register() {
    const [email, set_email] = useState(null);
    const [username, set_username] = useState(null);
    const [password, set_password] = useState(null);
    const [status, set_status] = useState(null);

    async function handle_submit(data) {
        const result = await register_user(data);
        set_status(result);
    }

    return (
        <div>
            <input onChange={e => {set_email(e.target.value)}} value={email} placeholder='email'></input>
            <input onChange={e => {set_username(e.target.value)}} value={username} placeholder='username'></input>
            <input onChange={e => {set_password(e.target.value)}} value={password} placeholder='password' type='password'></input>
            <div onClick={() => {handle_submit({ username: username, email: email, password: password })}}>register</div>

            {status &&
                <div>{status}</div>
            }
        </div>
    )
}