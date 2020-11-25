import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export function Top_Nav() {
    return (
        <Wrapper>
            <Link to={'/Register'}>Register</Link>
            <Link to={'/Login'}>Login</Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 75px;
    background: #111111;
`