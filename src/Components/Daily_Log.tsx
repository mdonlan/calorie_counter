import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { get_data_from_db, get_food_details, get_food_from_date } from '../api'
import { Add_Food } from './Add_Food_To_Log/Add_Food';
import { Edit_Log_Item } from './Edit_Log_Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from '../store';

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
            await get_food_from_date();
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
            new_total.cals += item.calories;
            new_total.carbs += item.carbs;
            new_total.fat += item.fat;
            new_total.protein += item.protein;
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
            <Meal_Header>
                <Meal_Title>Breakfast</Meal_Title>
                <Add_Food meal='breakfast'/>    
            </Meal_Header>
            <Meal_Items>
                {log_items.filter(item => item.meal == 'breakfast').map((filtered_item, i) => {
                    return (
                        <Item key={i}>
                            <Text>{filtered_item.food_name}</Text>
                            {/* <Text_Input onChange={() => {handle_qty_change(filtered_item)}} value={filtered_item.qty}></Text_Input> */}
                            <Text>{filtered_item.servings}</Text>
                            <Text>{filtered_item.calories_per_serving * filtered_item.servings}</Text>
                            <Edit_Btn><FontAwesomeIcon onClick={() => {set_edit_item(filtered_item)}} icon={faEdit}/></Edit_Btn>
                        </Item>
                    )
                })}
            </Meal_Items>
            <Meal_Header>
                <Meal_Title>Lunch</Meal_Title>
                <Add_Food meal='lunch'/>
            </Meal_Header>
            <Meal_Items>
                {log_items.filter(item => item.meal == 'lunch').map((filtered_item, i) => {
                    return (
                        <Item key={i}>
                            <Text>{filtered_item.food_name}</Text>
                            {/* <Text_Input value={filtered_item.qty}></Text_Input> */}
                            <Text>{filtered_item.servings}</Text>
                            <Text>{filtered_item.calories_per_serving * filtered_item.servings}</Text>
                            <Edit_Btn><FontAwesomeIcon onClick={() => {set_edit_item(filtered_item)}} icon={faEdit}/></Edit_Btn>
                        </Item>
                    )
                })}
            </Meal_Items>
            <Meal_Header>
                <Meal_Title>Dinner</Meal_Title>
                <Add_Food meal='dinner'/>
            </Meal_Header>
            <Meal_Items>
                {log_items.filter(item => item.meal == 'dinner').map((filtered_item, i) => {
                    return (
                        <Item key={i}>
                            <Text>{filtered_item.food_name}</Text>
                            {/* <Text_Input value={filtered_item.qty}></Text_Input> */}
                            <Text>{filtered_item.servings}</Text>
                            <Text>{filtered_item.calories_per_serving * filtered_item.servings}</Text>
                            <Edit_Btn>
                                <FontAwesomeIcon onClick={() => {set_edit_item(filtered_item)}} icon={faEdit} size="xs"/>
                            </Edit_Btn>
                        </Item>
                    )
                })}
            </Meal_Items>
            <Meal_Header>
                <Meal_Title>Snacks</Meal_Title>
                <Add_Food meal='snacks'/>
            </Meal_Header>
            <Meal_Items>
                {log_items.filter(item => item.meal == 'snacks').map((filtered_item, i) => {
                    return (
                        <Item key={i}>
                            <Text>{filtered_item.food_name}</Text>
                            {/* <Text_Input value={filtered_item.qty}></Text_Input> */}
                            <Text>{filtered_item.servings}</Text>
                            <Text>{filtered_item.calories_per_serving * filtered_item.servings}</Text>
                            <Edit_Btn><FontAwesomeIcon onClick={() => {set_edit_item(filtered_item)}} icon={faEdit}/></Edit_Btn>
                        </Item>
                    )
                })}
            </Meal_Items>

            {is_editing_item &&
                <Edit_Log_Item item={active_item} set_is_editing={set_is_editing_item}/>
            }

            <Totals>
                <div>Totals</div>
                <Total_Item>Calories: {totals.cals}</Total_Item>
                <Total_Item>Carbs: {totals.carbs}</Total_Item>
                <Total_Item>Fat: {totals.fat}</Total_Item>
                <Total_Item>Protein: {totals.protein}</Total_Item>
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
`

const Today_Date = styled.div``

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
    width: 12px;
    height: 12px;
    color: ${props => props.theme.color_offset4};
`

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    background: ${props => props.theme.dp1};
    margin-top: 12px;
    padding: 3px;
`

const Totals = styled.div`
    margin-top: 30px;
    border-top: 1px solid #dddddd;
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