import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux';

export function Top_Nav() {

    const logged_in = useSelector(state => state.default.logged_in);

    return (
        <Wrapper>
            <Left>
                <Styled_Link to={'/'}>Home</Styled_Link>
                <Styled_Link to={'/weekly_chart'}>Weekly Chart</Styled_Link>
                <Styled_Link to={'/create_user_food'}>Create User Food</Styled_Link>
            </Left>
            <Right>
                {!logged_in &&
                    <React.Fragment>
                        <Styled_Link to={'/Register'}>Register</Styled_Link>
                        <Styled_Link to={'/Login'}>Login</Styled_Link>
                    </React.Fragment>
                }
            </Right>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #111111;
`

const Left = styled.div`
    width: 50%;
    display: flex;
    padding-left: 15px;
`

const Right = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
`

const Styled_Link = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.font.main};
    border: 1px solid #111111;
    padding: 5px;
    margin-left: 3px;
    margin-right: 3px;
    cursor: pointer;

    :hover {
        background: #111111;
        color: #dddddd;
    }
`