import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { get_recent_foods } from '../api';

export function Recent_Foods() {
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
                        <div>{food.food_name}</div>
                    )
                })
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: blue;
`
