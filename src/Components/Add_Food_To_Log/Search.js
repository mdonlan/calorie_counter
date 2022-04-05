import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { search_foods, get_food_details } from '../../api.js'
import styled from 'styled-components'
import { Search_Results_Nutritionix } from './Search_Results_Nutritionix.js';
import { Search_Results_User_Created } from './Search_Results_User_Created';

export function Search(props) {
    // const [results, set_results] = useState([]);
    const [query, set_query] = useState('');
    // const history = useHistory();
    const input_ref = useRef();

    useEffect(() => {
        input_ref.current.focus(); // set the focus on load
    }, []);

    return (
        <Wrapper>
            <Input ref={input_ref} onChange={e => set_query(e.target.value)}  value={query} placeholder="search" />
            <Search_Results_User_Created query={query} set_food={props.set_food} />
            <Search_Results_Nutritionix query={query} set_food={props.set_food} />
        </Wrapper>
    )
}

const Wrapper = styled.div``
const Input = styled.input``

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