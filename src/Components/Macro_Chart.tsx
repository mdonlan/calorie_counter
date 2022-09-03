import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { TooltipProps } from 'recharts';

const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
const pieData = [
    {
       name: "Carbs",
       value: 0
    },
    {
       name: "Fat",
       value: 0
    },
    {
       name: "Protein",
       value: 0
    }
 ];

export function Macro_Chart() {
    const [macros, set_macros] = useState([{name: "Carbs", value: 0}, {name: "Fat", value: 0}, {name: "Protein", value: 0}]);
    const daily_items = useSelector((state: RootState) => state.default.daily_food_items);

    useEffect(() => {
        (async () => {
            console.log("get_macros")
           get_macros();
        })()
    }, [daily_items.length])

    async function get_macros() {
        let carbs = 0;
        let fat = 0;
        let protein = 0;
        daily_items.forEach(item => {
            carbs += item.carbs;
            fat += item.total_fat;
            protein += item.protein;
        });

        const _macros = [...macros];
        _macros[0].value = carbs;
        _macros[1].value = fat;
        _macros[2].value = protein;

        set_macros(_macros);
    }

    let CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
        if (active) {
            return (
                <Custom_Tooltip>
                    <label>{`${payload[0].name} : ${payload[0].value}`}</label>
                </Custom_Tooltip>
            );
        }
        return null;
    };

    function has_data() {
        if (macros[0].value > 0 || macros[1].value > 0 || macros[2].value > 0) return true;
        return false;
    }

    return (
        <Wrapper>
            <Title>Daily Macros</Title>
            <PieChart width={200} height={200}>
                <Pie
                    data={has_data() ? macros : [{name: "No Data", value: 1}]}
                    color="#000000"
                    key={Math.random()} // do this to force anim?
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    fill="#8884d8"
                >
                    {pieData.map((entry, index) => (
                        <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                {has_data() &&
                    <Tooltip content={<CustomTooltip />} />
                }
                <Legend />
                </PieChart>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    // padding: 25px;
    color: ${props => props.theme.color};
    background: ${props => props.theme.dp1};
    // height: 200px;
    width: 225px;
    margin-top: 20px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Title = styled.div`
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 8px;
`

const Custom_Tooltip = styled.div`
    color: #111111;
`