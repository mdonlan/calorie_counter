import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { search_foods_nutritionix } from '../../api.js'
import styled from 'styled-components'

export function Search_Results_Nutritionix(props) {
    const [results, set_results] = useState([]);
    const history = useHistory();
    
    useEffect(() => {
        if (props.query.length > 0) {
            search_foods_nutritionix(props.query)
            .then(async res => {
                set_results(res.data);
            })
        }
    }, [props.query])

    function handle_item_click(item) {
        props.set_food(item);
    }

    function num_results() {
        if (results.common) {
            return results.common.length + results.branded.length;
        }
    }

    return (
        <Wrapper>
            {props.query.length > 0 &&
                <React.Fragment>
                    <Title>Nutritionix Foods</Title>
                    <div>Results: {num_results()}</div>
                </React.Fragment>
            }
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

const Title = styled.div`
    font-size: 18px;
    border-bottom: 1px solid #111111;
`

const Results = styled.div`
    max-height: 300px;
    overflow-y: auto;
    background: #b3b3b3;
`


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