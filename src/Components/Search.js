import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { search_foods, get_food_details } from '../api.js'
import styled from 'styled-components'

export function Search(props) {
    
    const [results, set_results] = useState([]);
    const [query, set_query] = useState('');
    const history = useHistory();
    
    useEffect(() => {
        if (query.length > 2) {
            search_foods(query)
            .then(async res => {
                // console.log(res.data)
                // const foods = res.data.common.map(item => item.food_name);
                // console.log(foods);
                // const food_details = await get_food_details(foods);
                // console.log(food_details)
                set_results(res.data);
            })
        }
    }, [query])

    function handle_query_input(e) {
        set_query(e.target.value);
    }

    function handle_item_click(item) {
        if (props.return_selected) {
            // console.log('search is returning selected')
            props.set(item);
        } else {
            // console.log('search is pushing to /food?food_name')
            history.push(`/food?${item.food_name}`);
        }
    }

    return (
        <Wrapper>
            <Input onChange={handle_query_input} value={query} placeholder="search" />
            <Results>
                {results.common && <Title>Common</Title>}
                {results.common &&
                    results.common.map((r, i) => {
                        return (
                            <Item key={i} onClick={() => {handle_item_click(r)}}>
                                <Item_Left>
                                    <Thumbnail src={r.photo.thumb} />
                                    <Name>{r.food_name}</Name>
                                </Item_Left>
                                <Item_Right>
                                    {r.full_nutrients &&
                                        <React.Fragment>
                                            <Calories>{r.full_nutrients.find(a => a.attr_id == 208).value}</Calories>
                                            {/* <div>fat {r.full_nutrients.find(a => a.attr_id == 204).value}</div>
                                            <div>carbs {r.full_nutrients.find(a => a.attr_id == 205).value}</div>
                                            <div>protein {r.full_nutrients.find(a => a.attr_id == 203).value}</div> */}
                                        </React.Fragment>
                                    }
                                </Item_Right>
                            </Item>
                        )
                    })
                }

                {results.branded && <Title>Branded</Title>}
                {results.branded &&
                    results.branded.map((r, i) => {
                        return (
                            <Item key={i} >
                                <Thumbnail src={r.photo.thumb} />
                                <Name>{r.food_name}</Name>
                            </Item>
                        )
                    })
                }
            </Results>
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