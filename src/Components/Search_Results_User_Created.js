import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { search_foods_user_created } from '../api.js'
import styled from 'styled-components'

export function Search_Results_User_Created(props) {
    const [results, set_results] = useState([]);
    // const [query, set_query] = useState('');
    // const history = useHistory();
    
    useEffect(() => {
        if (props.query.length > 2) {
            search_foods_user_created(props.query)
            .then(async res => {
                // console.log(res.data)
                set_results(res.data);
            })
        }
    }, [props.query])

    // function handle_query_input(e) {
    //     set_query(e.target.value);
    // }

    // function handle_item_click(item) {
    //     if (props.return_selected) {
    //         // console.log('search is returning selected')
    //         props.set(item);
    //     } else {
    //         // console.log('search is pushing to /food?food_name')
    //         history.push(`/food?${item.food_name}`);
    //     }
    // }

    return (
        <Wrapper>
            {results.map(result => {
                return (
                    <div>{result.food_name}</div>
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


// const Title = styled.div``
// const Common = styled.div``
// const Branded = styled.div``

// const Item = styled.div`
//     display: flex;
// `

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