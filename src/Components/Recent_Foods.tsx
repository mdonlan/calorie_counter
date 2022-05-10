import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { get_recent_foods } from '../api';

export function Recent_Foods(props) {
    const [recent_foods, set_recent_foods] = useState([]);

    
    useEffect(() => {
        const fetchData = async () => {
            const data = await get_recent_foods();
            // const json = await response.json();
            set_recent_foods(data);
        }
        fetchData()
        .catch(console.error);
        // const data = get_recent_foods();
        // set_recent_foods(data);
    }, []);

    return (
        <Wrapper>
            {recent_foods &&
                recent_foods.map(food => {
                    return (
                       <Food_Item key={food.transaction_id} onClick={() => {props.set_food(food)}}>
                            <Food_Name>{food.food_name}</Food_Name>
                            <Food_Cals>{food.calories_per_serving}</Food_Cals>
                       </Food_Item>
                    )
                })
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    /* background: blue; */
`

const Food_Item = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background: ${props => props.theme.dp2};
    margin-bottom: 3px;

    :hover {
        background: ${props => props.theme.dp4};
    }
`

const Food_Name = styled.div``
const Food_Cals = styled.div``