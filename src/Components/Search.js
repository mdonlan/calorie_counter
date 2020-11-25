import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { search_foods } from '../api.js'
import styled from 'styled-components'

export function Search(props) {
    
    const [results, set_results] = useState([]);
    const [query, set_query] = useState('');
    const history = useHistory();
    
    useEffect(() => {
        if (query.length > 2) {
            search_foods(query)
            .then(res => {
                set_results(res.data);
            })
        }
    }, [query])

    function handle_query_input(e) {
        set_query(e.target.value);
    }

    function handle_item_click(item) {
        if (props.return_selected) {
            console.log('search is returning selected')
            props.set(item);
        } else {
            console.log('search is pushing to /food?food_name')
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
                                <Thumbnail src={r.photo.thumb} />
                                <Name>{r.food_name}</Name>
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
const Results = styled.div``
const Title = styled.div``
const Common = styled.div``
const Branded = styled.div``

const Item = styled.div`
    display: flex;
`

const Thumbnail = styled.img`
    width: 50px;
    height: 50px;
`

const Name = styled.div``