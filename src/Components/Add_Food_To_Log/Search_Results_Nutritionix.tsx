import React, { useEffect, useMemo, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { search_food, search_nutritionix_food_nutrients } from '../../api'
import styled from 'styled-components'
import { Food } from '../../Types'

interface Nutritionix_Results {
    common: any[];
    branded: any[];
}

export function Search_Results_Nutritionix(props) {
    const [results, set_results] = useState<Nutritionix_Results>({common: [], branded: []});
    const history = useHistory();
    const [show_common, set_show_common] = useState(true);
    const [show_branded, set_show_branded] = useState(true);
    const [common_show_count, set_common_show_count] = useState<number>(5);
    const [branded_show_count, set_branded_show_count] = useState<number>(5);

    
    useEffect(() => {
        const debounce_request = setTimeout(() => {
            get_data();
        }, 500)
      
        return () => clearTimeout(debounce_request)
    }, [props.query])    

    async function get_data() {
        console.log('__ geting data!');
        if (props.query.length > 2) {
            const data: Nutritionix_Results = await search_food(props.query);
            remove_dupes(data);
            set_results(data);
        }
    }

    // remove duplicate items for the search results
    // only can do this for common? not branded?
    function remove_dupes(data: Nutritionix_Results) {
        const tag_ids: number[] = [];
        const new_common_arr = [];

        for (let food of data.common) {
            let is_dupe: boolean = false;
            for (let id of tag_ids) {
                if (id == food.tag_id) {
                    is_dupe = true;
                }
            }

            if (!is_dupe) {
                tag_ids.push(food.tag_id);
                new_common_arr.push(food);
            }
        }

        data.common = new_common_arr;
    }

    async function handle_item_click(item) {
        console.log("Clicked on a Nutritionix food item...", item);
        const converted_food = convert_nutritionix_food(item);
        const food_nutrients = await search_nutritionix_food_nutrients(item.food_name);
        // console.log(get_alt_measures);
        converted_food.alt_measures = food_nutrients.alt_measures;
        props.set_food(converted_food);
    }

    function get_nutrient(food, index) {
        const value = food.full_nutrients.find(a => a.attr_id == index);
        if (value == undefined) return 0;
        return value.value;
    }

    function convert_nutritionix_food(food) {
        // console.log("nutritionix_food: ", nutritionix_food);

        const new_food: Food = {
            food_name: food.food_name,
            calories_per_serving: get_nutrient(food, 208),
            servings: 1,
            serving_qty: food.serving_qty,
            // serving_size: food.serving_unit,
            carbs: get_nutrient(food, 205),
            protein: get_nutrient(food, 203),
            total_fat: get_nutrient(food, 204),
            trans_fat: get_nutrient(food, 605),
            sat_fat: get_nutrient(food, 606),
            poly_fat: get_nutrient(food, 646),
            mono_fat: get_nutrient(food, 645),
            cholesterol: get_nutrient(food, 601),
            sodium: get_nutrient(food, 307),
            potassium: get_nutrient(food, 306),
            fiber: get_nutrient(food, 291),
            sugar: get_nutrient(food, 269),
            vitamin_a: get_nutrient(food, 318),
            vitamin_c: get_nutrient(food, 401),
            calcium: get_nutrient(food, 301),
            iron: get_nutrient(food, 303),
            meal:  props.meal,
            serving_unit: food.serving_unit,
            alt_measures: []
        }

        // console.log(food);
        return new_food;
    }

    function num_results() {
        if (results.common) {
            return results.common.length + results.branded.length;
        }
    }

    return (
        <Wrapper>
            {props.query.length > 0 &&
                <React.Fragment>
                    {/* <Title>Nutritionix Foods</Title> */}
                    <div>Results: {num_results()}</div>
                </React.Fragment>
            }
            <Filters>
                <Filter_Item onClick={() => {set_show_branded(true); set_show_common(true)}}>All</Filter_Item>
                <Filter_Item onClick={() => {set_show_branded(false); set_show_common(true)}}>Common</Filter_Item>
                <Filter_Item onClick={() => {set_show_branded(true); set_show_common(false)}}>Branded</Filter_Item>
            </Filters>
            <Results>
                {results.common.length > 0 && show_common && <Title>Common</Title>}
                {results.common && show_common &&
                    results.common.slice(0, common_show_count).map((r, i) => {
                        return (
                            <Item key={i} onClick={() => {handle_item_click(r)}}>
                                <Item_Left>
                                    <Thumbnail src={r.photo.thumb} />
                                    <Name>{r.food_name}</Name>
                                </Item_Left>
                                <Item_Right>
                                    {r.full_nutrients &&
                                        <React.Fragment>
                                            <Calories>{r.full_nutrients.find(a => a.attr_id == 208).value}</Calories>
                                        </React.Fragment>
                                    }
                                </Item_Right>
                            </Item>
                        )
                    })
                }
                {results.common.length > 0 && show_common &&
                    <Show_More_Btn onClick={() => {set_common_show_count(common_show_count + 5)}}>Show More</Show_More_Btn>
                }

                {results.branded.length > 0 && show_branded && <Title>Branded</Title>}
                {results.branded && show_branded &&
                    results.branded.slice(0, branded_show_count).    map((r, i) => {
                        return (
                            <Item key={i} onClick={() => {handle_item_click(r)}}>
                                <Item_Left>
                                    <Thumbnail src={r.photo.thumb} />
                                    <Name>{r.food_name}</Name>
                                </Item_Left>
                                <Item_Right>
                                    {r.full_nutrients &&
                                        <React.Fragment>
                                            <Calories>{r.full_nutrients.find(a => a.attr_id == 208).value}</Calories>
                                        </React.Fragment>
                                    }
                                </Item_Right>
                            </Item>
                        )
                    })
                }
                {results.branded.length > 0 && show_branded &&
                    <Show_More_Btn onClick={() => {set_branded_show_count(branded_show_count + 5)}}>Show More</Show_More_Btn>
                }
            </Results>
        </Wrapper>
    )
}

const Wrapper = styled.div``
const Input = styled.input`
    outline: none;
    border: none;
`

const Title = styled.div`
    font-size: 18px;
    border-bottom: 1px solid #111111;
`

const Results = styled.div`
    max-height: 300px;
    overflow-y: auto;
    background: #252525;
    display: flex;
    flex-direction: column;
    align-items: center;
`


const Common = styled.div``
const Branded = styled.div``

const Item = styled.div`
    display: flex;
    width: 90%;
    cursor: pointer;
    margin-bottom: 8px;

    :hover {
        background: ${props => props.theme.dp5};
    }
`

const Item_Left = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
`

const Item_Right = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 50%;
`

const Thumbnail = styled.img`
    width: 50px;
    height: 50px;
`

const Name = styled.div`
    font-size: 16px;
    margin-left: 25px;
`
const Calories = styled.div`
    font-size: 16px;
    padding-right: 8px;
`

const Filters = styled.div`
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
    background: rgba(255, 255, 255, 0.05);
`

const Filter_Item = styled.div`
    padding: 3px;
    margin-left: 3px;
    margin-right: 3px;
    background: #222222;
    cursor: pointer;

    :hover {
        background: #343434;
    }
`

const Show_More_Btn = styled.div`
    background: ${props => props.theme.dp2};
    text-align: center;
    margin-top: 3px;
    margin-bottom: 3px;
    padding-top: 3px;
    padding-bottom: 3px;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.dp5};
    }
`