import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { add_food_to_log, get_food_from_date } from '../../api';
import { Search } from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export interface Food {
    food_name: string;
    cals_per_serving: number;
    servings: number;
    meal: string; 
    serving_size: number;
    carbs: number;
    protein: number;
    total_fat: number;
    trans_fat: number;
    sat_fat: number;
    poly_fat: number;
    mono_fat: number;
    cholesterol: number;
    sodium: number;
    potassium: number;
    fiber: number;
    sugar: number;
    vitamin_a: number;
    vitamin_c: number;
    calcium: number;
    iron: number;
    serving_unit: string;
}

// export interface User_Created_Food {
//     name: string;
//     cals_per_serving: number;
//     servings: number;
//     meal: string; 
//     serving_size: number;
//     carbs: number;
//     protein: number;
//     total_fat: number;
//     trans_fat: number;
//     sat_fat: number;
//     poly_fat: number;
//     mono_fat: number;
//     cholesterol: number;
//     sodium: number;
//     potassium: number;
//     fiber: number;
//     sugar: number;
//     vitamin_a: number;
//     vitamin_c: number;
//     calcium: number;
//     iron: number;
// }

export function Add_Food(props) {
    const [active, set_active] = useState<boolean>(false);
    const [food, set_food] = useState<Food | null>(null);
    const [servings, set_servings] = useState<number>(1);

    // useEffect(() => {
    // //    console.log("food: ", food);
    //     if (food.full_nutrients) { // using a nutritionix food
    //         convert_nutritionix_food(food);
    //     }
    // }, [food]);


    async function handle_confirm() {
        
        console.log(food)
        

        const new_food: Food = {
            food_name: food.food_name,
            cals_per_serving: food.cals_per_serving,
            servings: servings,
            serving_size: food.serving_size,
            carbs: food.carbs * servings,
            protein: food.protein * servings,
            total_fat: food.total_fat * servings,
            trans_fat: food.trans_fat * servings,
            sat_fat: food.sat_fat * servings,
            poly_fat: food.poly_fat * servings,
            mono_fat: food.mono_fat * servings,
            cholesterol: food.cholesterol * servings,
            sodium: food.sodium * servings,
            potassium: food.potassium * servings,
            fiber: food.fiber * servings,
            sugar: food.sugar * servings,
            vitamin_a: food.vitamin_a * servings,
            vitamin_c: food.vitamin_c * servings,
            calcium: food.calcium * servings,
            iron: food.iron * servings,
            meal:  props.meal,
            serving_unit: food.serving_unit
            // cals: food.full_nutrients.find(a => a.attr_id == 208).value,
            // meal: props.meal,
            // qty: qty,
            // fat: food.full_nutrients.find(a => a.attr_id == 204).value,
            // carbs: food.full_nutrients.find(a => a.attr_id == 205).value,
            // protein: food.full_nutrients.find(a => a.attr_id == 203).value
        }

        console.log("new_food: ", new_food)

        await add_food_to_log(new_food);
        set_active(false);
        set_food(null);
        get_food_from_date();
    }

    function handle_close() {
        set_active(false);
        set_food(null);
    }

    function handle_servings(e) {
        set_servings(e.target.value);
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
                    {active && food &&
                        <Selected_Food>
                            <div>name: {food.food_name}</div>
                            <input onChange={handle_servings} value={servings}/>
                            <Food_Details>
                                
                                <Left>
                                    <div>Cals {food.cals_per_serving * servings}</div>
                                    <div>Calories Per Serving {food.cals_per_serving}</div>
                                    <div>Serving Size {food.serving_size}</div>
                                    <div>Carbs {food.carbs * servings}</div>
                                    <div>Protein {food.protein * servings}</div>
                                    <div>Total Fat {food.total_fat * servings}</div>
                                    <div>Trans Fat {food.trans_fat * servings}</div>
                                    <div>Sat Fat {food.sat_fat * servings}</div>
                                    <div>Poly Fat {food.poly_fat * servings}</div>
                                    <div>Mono Fat {food.mono_fat * servings}</div>
                                </Left>
                                <Right>
                                    <div>Cholesterol {food.cholesterol * servings}</div>
                                    <div>Sodium {food.sodium * servings}</div>
                                    <div>Potassium {food.potassium * servings}</div>
                                    <div>Fiber {food.fiber * servings}</div>
                                    <div>Sugar {food.sugar * servings}</div>
                                    <div>Vitamin A {food.vitamin_a * servings}</div>
                                    <div>Vitamin C {food.vitamin_c * servings}</div>
                                    <div>Calcium {food.calcium * servings}</div>
                                    <div>Iron {food.iron * servings}</div>
                                </Right>
                                
                                
                                {/* <Thumbnail src={food.photo.thumb} /> */}
                            </Food_Details>
                            <Buttons>
                                <Confirm_Button onClick={handle_confirm}>Confirm</Confirm_Button>
                                <Cancel_Button onClick={handle_close}>Cancel</Cancel_Button>
                            </Buttons>
                        </Selected_Food>
                    }
                </Bottom>
            </Panel>
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Panel = styled.div<{ active: boolean }>`
    display: ${props => props.active ? 'flex' : 'none'};
    flex-direction: column;
    width: 50%;
    height: 50%;
    background: #333333;
    position: absolute;
    top: calc(25%);
    left: calc(25%);
    border: 1px solid #dddddd;
`


const Food_Details = styled.div`
    display: flex;
`


const Left = styled.div``
const Right = styled.div``

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