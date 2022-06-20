import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { get_weekly_calories } from '../api'
import { useSelector } from 'react-redux'

export function Weekly_Chart() {
    const daily_calorie_target = useSelector(state => state.default.user_data.daily_calorie_target);
    const [data, set_data] = useState([]);
    const [max, set_max] = useState(0);

    useEffect(async () => {
        const data = await get_weekly_calories();
        
        let _max = 0;
        data.forEach(day => {
            day.goal = daily_calorie_target;
            if (day.calories > _max) {
                _max = day.calories;
            }
        })
        if (data[0].goal > _max) _max = data[0].goal;
        set_max(_max + (_max * .10));
        console.log(data);
        set_data(data);
    }, [data.length, daily_calorie_target])

    return (
        <Wrapper>
            <Title>Weekly Calories</Title>
            <LineChart width={400} height={400} data={data}>
                <XAxis dataKey="date"/>
                <YAxis dataKey="calories" domain={[0, max]}/>
                <Legend align="left"/>
                <Line type="monotone" dataKey="calories" stroke="#3277a8" />
                <Line type="monotone" dataKey="goal" stroke="#a84632" />
            </LineChart>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 25px;
`
const Title = styled.div``