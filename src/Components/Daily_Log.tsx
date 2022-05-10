import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { get_data_from_db, get_food_details, get_food_from_today } from '../api'
import { Add_Food } from './Add_Food_To_Log/Add_Food';
import { Edit_Log_Item } from './Edit_Log_Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from '../store';

const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"]; 

export function Daily_Log() {
    const log_items = useSelector((state: RootState) => state.default.food_items_today);
    const [totals, set_totals] = useState({
        cals: 0,
        carbs: 0,
        protein: 0,
        fat: 0
    });

    const [is_editing_item, set_is_editing_item] = useState(false);
    const [active_item, set_active_item] = useState(null);
    

    useEffect(() => {
        const fetch_foods = async () => {
            await get_food_from_today();
            // const results = await get_food_from_date();
            // set_log_items(results);
            get_totals();

        }
        fetch_foods();
    }, [log_items.length]);

    function get_totals() {
        const new_total = {
            cals: 0,
            carbs: 0,
            protein: 0,
            fat: 0
        }

        log_items.forEach(item => {
            new_total.cals += item.calories_per_serving * item.servings;
            new_total.carbs += item.carbs * item.servings;
            new_total.fat += item.total_fat * item.servings;
            new_total.protein += item.protein * item.servings;
        });

        set_totals(new_total);
    }

    function set_edit_item(item) {
        set_is_editing_item(true);
        set_active_item(item);
    }

    return (
        <Wrapper>
            <Today_Date>Daily Food Log - Today {new Date().toLocaleDateString()}</Today_Date>
            <Column_Headers>
                <Column_Title></Column_Title>
                <Column_Title>Servings</Column_Title>
                <Column_Title>Calories</Column_Title>
                <Column_Title></Column_Title>
            </Column_Headers>
            
            {meals.map(meal_name => {
               return (
                    <Meal key={meal_name}>
                        <Meal_Header>
                            <Meal_Title>{meal_name}</Meal_Title>
                            <Add_Food meal={meal_name}/>    
                        </Meal_Header>
                        <Meal_Items>
                            {log_items.filter(item => item.meal == meal_name).map((filtered_item, i) => {
                                return (
                                    <Item key={i}>
                                        <Text>{filtered_item.food_name}</Text>
                                        <Text>{filtered_item.servings} {filtered_item.serving_unit}</Text>
                                        <Text>{Math.round(filtered_item.calories_per_serving * filtered_item.servings)}</Text>
                                        <Edit_Btn><FontAwesomeIcon onClick={() => {set_edit_item(filtered_item)}} icon={faEdit}/></Edit_Btn>
                                    </Item>
                                )
                            })}
                        </Meal_Items>
                    </Meal>
               )
            })}

            {is_editing_item &&
                <Edit_Log_Item item={active_item} set_is_editing={set_is_editing_item}/>
            }

            <Totals>
                <Total_Item>Calories: {Math.ceil(totals.cals)}</Total_Item>
                <Total_Item>Carbs: {Math.ceil(totals.carbs)}</Total_Item>
                <Total_Item>Fat: {Math.ceil(totals.fat)}</Total_Item>
                <Total_Item>Protein: {Math.ceil(totals.protein)}</Total_Item>
            </Totals>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    color: ${props => props.theme.color};
    margin: 20px;
    padding: 20px;
    width: 600px;
    background: ${props => props.theme.dp1};
    border-radius: 8px;
`

const Today_Date = styled.div``

const Meal = styled.div``

const Meal_Header = styled.div`
    display: flex;
    margin-top: 10px;
    color: ${props => props.theme.color_offset3};
    border-bottom: 1px solid ${props => props.theme.dp2};
`

const Meal_Title = styled.div`
    margin-right: 10px;
`

const Meal_Items = styled.div`
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 50px;
`

const Edit_Btn = styled.div`
    /* width: 12px; */
    /* height: 12px; */
    color: ${props => props.theme.color_offset4};
`

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    background: ${props => props.theme.dp1};
    margin-top: 12px;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 4px;
`

const Totals = styled.div`
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #dddddd;
    display: flex;
    justify-content: space-around;
`

const Total_Item = styled.div``

const Text = styled.div`
    width: 125px;
`

const Column_Headers = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 30px;
`

const Column_Title = styled.div`
    padding-left: 40px;
    width: 100px;
    color: ${props => props.theme.dp5};
    font-size: 14px;
`