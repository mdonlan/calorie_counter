import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Daily_Log } from './Daily_Log'
import { RootState, Initial_State } from '../store';
import { useSelector } from 'react-redux';
import { Food } from '../Types';
import { User_Data } from '../Types';

export function Daily_Calorie_Bar() {
    const daily_food_items = useSelector((state: RootState) => state.default.daily_food_items);
    const user_data = useSelector((state: RootState) => state.default.user_data);
    const [calories, set_calories] = useState<number>(0);
    const [bar_width, set_bar_width] = useState<number>(100);
    const [fill_width, set_fill_width] = useState<number>(0);

    useEffect(() => {
        const total = daily_food_items.reduce((accumulator: number, object: Food) => {
            return accumulator + object.calories_per_serving * object.servings;
        }, 0);
        set_calories(total);
    
        let fill_width_size = (calories / user_data.daily_calorie_target) * 100;
        if (isFinite(fill_width_size)) {
            set_fill_width(fill_width_size);
        }
        

    }, [daily_food_items.length, user_data])

    return(
        <Wrapper>
            <Title>Daily Calorie Target</Title>
            <Bar>
                {user_data &&
                    <Fill width={fill_width}></Fill>
                }
            </Bar>
            <Total>{Math.round(calories)}/{user_data.daily_calorie_target}</Total>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    // padding: 25px;
    color: ${props => props.theme.color};
    background: ${props => props.theme.dp1};
    // height: 200px;
    // width: 225px;
    margin-top: 20px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.div`
    font-size: 18px;
    margin-bottom: 8px;
    margin-top: 10px;
`

const Bar = styled.div`
    width: 100px;
    height: 30px;
    background: #323232;
    margin-bottom: 8px;
`;

const Fill = styled.div<{width: number}>`
    width: ${props => props.width}px;
    height: 30px;
    background: blue;
`;

const Total = styled.div`
    margin-bottom: 12px;
`