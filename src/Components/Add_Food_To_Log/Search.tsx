import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
// import { search_foods } from '../../api'
import styled from 'styled-components'
import { Search_Results_Nutritionix } from './Search_Results_Nutritionix';
// import { Search_Results_User_Created } from './Search_Results_User_Created';
// import { Food } from '../Food.js';

export function Search(props) {
    // const [results, set_results] = useState([]);
    // const [query, set_query] = useState('');
    // const history = useHistory();
    const input_ref = useRef(null);

    useEffect(() => {
        if (input_ref.current) {
            input_ref.current.focus(); // set the focus on load
        }
    }, []);

    function onchange_handler(e) {
        props.set_query(e.target.value)
    }

    return (
        <Wrapper>
            <Input ref={input_ref} onChange={onchange_handler}  value={props.query} placeholder="search" />
            {/* <Search_Results_User_Created query={query} set_food={props.set_food} /> */}
            <Search_Results_Nutritionix query={props.query} set_food={props.set_food} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // margin: 5px;
`

const Input = styled.input`
    &:focus {
        outline: none;
    }
`

const Results = styled.div`
    max-height: 300px;
    overflow-y: auto;
    background: #b3b3b3;
`


const Title = styled.div``
const Common = styled.div``
const Branded = styled.div``

const Item = styled.div`
    display: flex;
`

const Item_Left = styled.div`
    display: flex;
    width: 50%;
`

const Item_Right = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 50%;
`

const Thumbnail = styled.img`
    width: 50px;
    height: 50px;
`

const Name = styled.div``
const Calories = styled.div``