import React, { useState } from 'react'
import styled from 'styled-components'
import { delete_food_from_log, update_log_item_qty, get_food_from_today } from '../api'

export function Edit_Log_Item(props) {

    const [qty, set_qty] = useState(props.item.servings);

    function handle_change(e) {
        set_qty(e.target.value);
    }

    async function handle_save() {
        await update_log_item_qty(props.item, qty);
        get_food_from_today();
        handle_cancel();
    }

    async function handle_delete() {
        await delete_food_from_log(props.item);
        get_food_from_today();
        handle_cancel();
    }

    function handle_cancel() {
        props.set_is_editing(false);
    }

    return (
        <Wrapper>
            <Food_Name>{props.item.food_name}</Food_Name>
            <Servings>
                <Input onChange={handle_change} value={qty}></Input>
                <div>Servings</div>
            </Servings>
            <Options>
                <div onClick={() => {handle_save()}}>save</div>
                <div onClick={handle_cancel}>cancel</div>
            </Options>
            <Delete onClick={handle_delete}>delete</Delete>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    width: 300px;
    height: 200px;
    top: calc(50% - 150px);
    left: calc(50% - 150px);
    background: ${props => props.theme.background_2};
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
`

const Food_Name = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
`

const Input = styled.input`
    width: 30px;
    margin-right: 2px;
`

const Servings = styled.div`
    display: flex;
`

const Options = styled.div`
    display: flex;
    justify-content: space-around;
    width: 50%;
`

const Delete = styled.div`
    margin-top: 16px;
`