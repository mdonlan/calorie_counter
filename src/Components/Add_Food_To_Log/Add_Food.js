import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { add_food_to_log, get_food_from_date } from '../../api';
import { Search } from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export function Add_Food(props) {
    const [active, set_active] = useState(false);
    const [food, set_food] = useState(null);
    const [qty, set_qty] = useState(1);

    // useEffect(() => {
    // //    console.log("food: ", food);
    //     if (food.full_nutrients) { // using a nutritionix food
    //         convert_nutritionix_food(food);
    //     }
    // }, [food]);

    function convert_nutritionix_food(food) {
        
    }

    async function handle_confirm() {
        // console.log(food)

        const new_food = {
            name: food.food_name,
            cals: food.full_nutrients.find(a => a.attr_id == 208).value,
            meal: props.meal,
            qty: qty,
            fat: food.full_nutrients.find(a => a.attr_id == 204).value,
            carbs: food.full_nutrients.find(a => a.attr_id == 205).value,
            protein: food.full_nutrients.find(a => a.attr_id == 203).value
        }

        await add_food_to_log(new_food);
        set_active(false);
        set_food(null);
        get_food_from_date();
    }

    function handle_close() {
        set_active(false);
        set_food(null);
    }

    function handle_qty(e) {
        set_qty(e.target.value);
    }

    return (
        <Wrapper>
            <Add_Button onClick={() => {set_active(true)}} icon={faPlus} ></Add_Button>

            <Panel active={active}>
                <Top>
                    <Panel_Title>Add Food</Panel_Title>
                    <Close_Btn onClick={() => {set_active(false)}}>X</Close_Btn>
                </Top>
                <Bottom>
                    {active && !food &&
                        <div>
                            <Search set_food={set_food}/>
                        </div>
                    }
                    {/* {active && food &&
                        <Selected_Food>
                            <Food_Details>
                                <div>{food.food_name}</div>
                                <div>Serving Unit: {food.serving_unit}</div>
                                <div>Serving Qty: <input onChange={handle_qty} value={qty} /></div>
                                <div>Calories: {food.full_nutrients[4].value * qty}</div>
                                <Thumbnail src={food.photo.thumb} />
                            </Food_Details>
                            <Buttons>
                                <Confirm_Button onClick={handle_confirm}>Confirm</Confirm_Button>
                                <Cancel_Button onClick={handle_close}>Cancel</Cancel_Button>
                            </Buttons>
                        </Selected_Food>
                    } */}
                </Bottom>
            </Panel>
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Panel = styled.div`
    display: ${props => props.active ? 'flex' : 'none'};
    flex-direction: column;
    width: 400px;
    height: 400px;
    background: #d4d4d4;
    position: absolute;
    top: calc(50% - 150px);
    left: calc(50% - 150px);
    border: 1px solid #222222;
`

const Add_Button = styled(FontAwesomeIcon)`
    cursor: pointer;
`

const Close_Btn = styled.div`
    padding-left: 3px;
    padding-right: 3px;
    cursor: pointer;

    :hover {
        color: red;
    }
`

const Thumbnail = styled.img`
    width: 50px;
    height: 50px;
`

const Panel_Title = styled.div``

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    height: 15px;
`
const Bottom = styled.div`
    height: calc(100% - 10px - 25px); // 10px for padding, rest for top size
    padding: 5px;
    display: flex;
    justify-content: center;
`

const Food_Details = styled.div``

const Confirm_Button = styled.div`
    padding: 8px;
    margin: 8px;
    background: #2d9c5f;
    cursor: pointer;
    transition: 0.5s;

    :hover {
        background: #3cd681;
    }
`

const Cancel_Button = styled.div`
    padding: 8px;
    margin: 8px;
    background: #912926;
    cursor: pointer;
    transition: 0.5s;

    :hover {
        background: #d1403b;
    }
`

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
`

const Selected_Food = styled.div``