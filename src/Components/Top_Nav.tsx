import React, {useState} from 'react'
import { useSelector } from 'react-redux';

// import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function Top_Nav() {

    const logged_in = useSelector((state: RootState) => state.default.logged_in);

    return (
        <Wrapper>
            {/* <Left> */}
                {logged_in &&
                    <React.Fragment>
                        <Styled_Link to={'/'}>Home</Styled_Link>
                        <Styled_Link to={'/weekly_chart'}>Weekly Chart</Styled_Link>
                        <Styled_Link to={'/create_user_food'}>Create User Food</Styled_Link>
                    </React.Fragment>
                }
            {/* </Left> */}
            {/* <Right> */}
                {!logged_in &&
                    <React.Fragment>
                        <Styled_Link to={'/'}>Home</Styled_Link>
                    </React.Fragment>
                }
            {/* </Right> */}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    background: ${props => props.theme.dp1};
    padding-top: 12px;
    padding-bottom: 12px;
`

// const Left = styled.div`
//     width: 50%;
//     display: flex;
//     padding-left: 15px;
// `

// const Right = styled.div`
//     width: 50%;
//     display: flex;
//     justify-content: flex-end;
//     padding-right: 15px;
// `

const Styled_Link = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.color};
    padding: 12px;
    margin-left: 6px;
    margin-right: 6px;
    cursor: pointer;
    background: ${props => props.theme.dp2};

    :hover {
        background: ${props => props.theme.dp3};
    }
`