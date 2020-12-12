import React, { useState } from 'react'
import styled from 'styled-components'
import { update_log_item_qty } from '../api'

export function Edit_Log_Item(props) {

    const [qty, set_qty] = useState(props.item.qty);

    function handle_change(e) {
        set_qty(e.target.value);
    }

    function handle_save() {
        update_log_item_qty(props.item, qty);
        props.set_is_editing(false);
    }

    return (
        <Wrapper>
            <div>{props.item.food_name}</div>
            <input onChange={handle_change} value={qty}></input>
            <div onClick={() => {handle_save()}}>save</div>
            <div onClick={() => {props.set_is_editing(false)}}>cancel</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    width: 300px;
    height: 300px;
    top: calc(50% - 150px);
    left: calc(50% - 150px);
    background: red;
`