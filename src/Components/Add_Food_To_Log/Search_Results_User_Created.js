import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { search_foods_user_created } from '../../api.js'
import styled from 'styled-components'
import { set_add_food_selection } from '../../store';

export function Search_Results_User_Created(props) {
    const [results, set_results] = useState([]);
    // const [query, set_query] = useState('');
    // const history = useHistory();
    
    useEffect(() => {
        if (props.query.length > 0) {
            search_foods_user_created(props.query)
            .then(async res => {
                // console.log(res.data)
                set_results(res.data);
                // set_add_food_selection()
            })
        }
    }, [props.query])

    // function handle_query_input(e) {
    //     set_query(e.target.value);
    // }

    function handle_item_click(item) {
        console.log("handle_item_click: ", item);
        props.set_food(item);
    }

    return (
        <Wrapper>
            {props.query.length > 0 &&
                <React.Fragment>
                    <Title>User Added Foods</Title>
                    <div>Results: {results.length}</div>
                </React.Fragment>
            }
            {results.map((result, i) => {
                return (
                    <Result key={i} onClick={() => handle_item_click(result)}>{result.food_name}</Result>
                )
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div``
// const Input = styled.input``

// const Results = styled.div`
//     max-height: 300px;
//     overflow-y: auto;
//     background: #b3b3b3;
// `


const Title = styled.div`
    font-size: 18px;
    border-bottom: 1px solid #111111;
`

// const Common = styled.div``
// const Branded = styled.div``

const Result = styled.div`
    /* display: flex; */
    height: 40px;
    width: 100%;
    background-color: red;
`

// const Item_Left = styled.div`
//     display: flex;
//     width: 50%;
// `

// const Item_Right = styled.div`
//     display: flex;
//     justify-content: flex-end;
//     width: 50%;
// `

// const Thumbnail = styled.img`
//     width: 50px;
//     height: 50px;
// `

// const Name = styled.div``
// const Calories = styled.div``