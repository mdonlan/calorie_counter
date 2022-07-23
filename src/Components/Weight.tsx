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
        if (data.length > 0) {
            set_weight(data[data.length - 1].weight);
        }
        const change = await get_monthly_weight_change();
        console.log("change: ", change.change)
        set_monthly_change(change.change);
    }

    async function add_weight() {
        await add_weight_entry(weight);
        get_data();
    }

    return (
        <Wrapper>
            <Title>Weight</Title>
            <div>Current: {weight_data.length > 0 ? weight_data[weight_data.length - 1].weight : 0}</div>
            <Set>
                <Weight_Input value={weight} onChange={e => {set_weight(e.target.value.replace(/\D/g, ''))}}/>
                <div onClick={() => {add_weight()}}>Update</div>
            </Set>
            
            <Change> Monthly Change: {monthly_change}</Change>
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
const Set = styled.div`
    display: flex;
`

const Weight_Input = styled.input`
    width: 50px;
`
const Change = styled.div`
    margin-bottom: 12px;
`