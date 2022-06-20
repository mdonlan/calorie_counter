import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { get_weight, add_weight_entry, get_monthly_weight_change } from '../api'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// export interface Weight_Entry {
//     date: Date;
//     weight: number
// };

export function Weight() {
    const [weight_data, set_weight_data] = useState([]);
    const [adding_new, set_adding_new] = useState<boolean>(false);
    const [entry_date, set_entry_date] = useState(new Date());
    const [weight, set_weight] = useState<any>(0);
    const [monthly_change, set_monthly_change] = useState<number>(0);

    useEffect(() => {
        (async () => {
           get_data()
        })()
    }, [])

    async function get_data() {
        const data = await get_weight();
        set_weight_data(data);
        const change = await get_monthly_weight_change();
        // console.log("change: ", change.change)
        set_monthly_change(change.change);
    }

    async function add_weight() {
        await add_weight_entry(weight);
        get_data();
    }

    return (
        <Wrapper>
            <Title>Current Weight: {weight_data.length > 0 ? weight_data[weight_data.length - 1].weight : 0}</Title>
            {/* <div onClick={() => {set_adding_new(true)}}>add</div> */}
            {/* {weight_data.map(entry => {
                return (
                    <div key={entry.id}>{entry.weight}</div>
                )
            })} */}
            <div>Set Todays Weight</div>
            <input value={weight} onChange={e => {set_weight(e.target.value.replace(/\D/g, ''))}}/>
            <div onClick={() => {add_weight()}}>add</div>

            <div>
                <div>Monthly Change: {monthly_change}</div>
            </div>
            {/* {adding_new &&
                <div>
                    <div>adding new weight entry</div>
                    <input value={weight} onChange={e => {set_weight(e.target.value.replace(/\D/g, ''))}}/>
                    <DatePicker selected={entry_date} onChange={(date:Date) => set_entry_date(date)} />
                    <div onClick={() => {add_weight_entry({date: entry_date, weight: weight})}}>add</div>
                </div>
            } */}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    // padding: 25px;
    color: ${props => props.theme.color};
    background: ${props => props.theme.dp1};
    height: 200px;
    width: 225px;
    margin-top: 20px;
    margin-left: 20px;
`
const Title = styled.div``