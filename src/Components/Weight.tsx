import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { get_weight, add_weight_entry, get_monthly_weight_change, get_recent_weights } from '../api'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from 'date-fns/format';
import { parseISO } from 'date-fns';

// export interface Weight_Entry {
//     date: Date;
//     weight: number
// };

export function Weight() {
    // const [weight_data, set_weight_data] = useState([]);
    // const [adding_new, set_adding_new] = useState<boolean>(false);
    // const [entry_date, set_entry_date] = useState(new Date());
    // const [weight, set_weight] = useState<any>(0);
    // const [monthly_change, set_monthly_change] = useState<number>(0);
    const [weights, set_weights] = useState([]);
    // const []

    useEffect(() => {
        (async () => {
           await get_data()
        })()
    }, [weights.length])

    async function get_data() {
        // const data = await get_weight();
        // set_weight_data(data);
        // if (data.length > 0) {
        //     set_weight(data[data.length - 1].weight);
        // }
        // const change = await get_monthly_weight_change();
        // console.log("change: ", change.change)
        // set_monthly_change(change.change);

        const weights = await get_recent_weights();
        
        for (let weight of weights) {
            weight.date = format(Date.parse(weight.date), 'MM/dd/yy');
        }

        set_weights(weights);
        // console.log(weights)
    }

    // async function add_weight() {
    //     await add_weight_entry(weight);
    //     get_data();
    // }

    return (
        <Wrapper>
            <Title>Weight</Title>
            {/* <div>Current: {weight_data.length > 0 ? weight_data[weight_data.length - 1].weight : 0}</div> */}
            {/* <Set>
                <Weight_Input value={weight} onChange={e => {set_weight(e.target.value.replace(/\D/g, ''))}}/>
                <div onClick={() => {add_weight()}}>Update</div>
            </Set> */}
            
            {/* <Change> Monthly Change: {monthly_change}</Change> */}
            {weights.length > 0 &&
                <ResponsiveContainer width="90%" height="70%">
                    <LineChart 
                        data={weights} 
                        margin={{left: 0, right: 0, top: 10, bottom: 0}}
                        key={Math.random()} // do this to force anim?
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="date"/>
                        {/* <XAxis /> */}
                        <Tooltip />
                        <YAxis width={30} dataKey="weight"/>
                        {/* <Legend align="left"/> */}
                        <Line type="monotone" dataKey="weight" stroke="#3277a8" />
                        {/* <Line type="monotone" dataKey="goal" stroke="#a84632" /> */}
                    </LineChart>
                </ResponsiveContainer>
            }
           
        </Wrapper>
    )
}

const Wrapper = styled.div`
    // padding: 25px;
    color: ${props => props.theme.color};
    background: ${props => props.theme.dp1};
    height: 200px;
    width: 225px;
    margin-top: 40px;
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
const Set = styled.div`
    display: flex;
`

const Weight_Input = styled.input`
    width: 50px;
`
const Change = styled.div`
    margin-bottom: 12px;
`