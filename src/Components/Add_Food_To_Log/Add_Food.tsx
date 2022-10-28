import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { add_food_to_log, get_food_from_date } from '../../api';
import { Search } from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Recent_Foods } from '../Recent_Foods';
import { Food, Alt_Measure } from '../../Types'
import { Barcode_Scanner } from './Barcode_Scanner'
import { device } from '../../theme.js'

enum View {
    SEARCH,
    RECENT,
    SCAN
}

export function Add_Food(props) {
    const [active, set_active] = useState<boolean>(false);
    const [food, set_food] = useState<Food | null>(null);
    const [servings, set_servings] = useState<number>(1);
    const [view, set_view] = useState<View>(View.SEARCH);
    const [show_details, set_show_details] = useState<boolean>(false);
    const [search_query, set_search_query] = useState<string>("");
    const panel_ref = useRef(null);
    
    useEffect(() => {
        const close_event = e => {
            console.log('closing')
            if (e.keyCode === 27) handle_close()
        }
    
        const click_event = e => {
            if (active && panel_ref.current && !panel_ref.current.contains(e.target)) {
                set_active(false);
            }
        }

        window.addEventListener('click', click_event);
        window.addEventListener('keydown', close_event);
        
        return () => {
            window.removeEventListener('keydown', close_event);
            window.removeEventListener('click', click_event);
        }
    },[active])

    async function handle_confirm() {        
        console.log(food)
        const new_food: Food = {
            food_name: food.food_name,
            calories_per_serving: food.calories_per_serving,
            servings: servings,
            serving_qty: food.serving_qty,  
            // serving_size: food.serving_size,
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
            serving_unit: food.serving_unit,
            alt_measures: [],
            photo: food.photo
        }
        console.log('new_food: ', new_food)
        await add_food_to_log(new_food, props.date);
        set_food(null);
        set_search_query("");
        get_food_from_date(props.date);
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
            <Add_Button onClick={() => {set_active(true)}} icon={faPlus} fixedWidth ></Add_Button>

            
            <Panel active={active} ref={panel_ref}>
                <Top>
                    <Panel_Title>Add Food</Panel_Title>
                    {/* <Close_Btn onClick={() => {set_active(false)}}>X</Close_Btn> */}
                </Top>
                <Bottom>
                    {active && !food &&
                        <React.Fragment>
                            <View_Buttons>
                                <View_Button active={view == View.SEARCH} onClick={() => set_view(View.SEARCH)}>search</View_Button>
                                <View_Button active={view == View.RECENT} onClick={() => set_view(View.RECENT)}>recent</View_Button>
                                <View_Button active={view == View.SCAN} onClick={() => {set_view(View.SCAN)}}>scan food</View_Button>
                            </View_Buttons>
                            {view == View.SEARCH &&
                                <Search set_food={set_food} query={search_query} set_query={set_search_query}/>
                            }
                            {view == View.RECENT &&
                                 <Recent_Foods set_food={set_food}/>
                            }
                            {/* {view == View.UPLOAD_PHOTO &&
                                // <input type="file" accept="image/*" capture="camera" />
                                <input accept="image/*" id="icon-button-file" type="file" capture="environment"/>
                            } */}
                            {view == View.SCAN &&
                                // <input type="file" accept="image/*" capture="camera" />
                                // <input accept="image/*" id="icon-button-file" type="file" capture="environment"/>
                                <Barcode_Scanner set_food={set_food}/>
                            }
                        </React.Fragment>
                    }
                    {active && food &&
                        <Selected_Food>
                            <Food_Name>{food.food_name}</Food_Name>
                            <Thumbnail src={food.photo} />
                            <Servings>
                               <Servings_Text>
                                    <div>Servings: </div>
                                    <Servings_Input onChange={handle_servings} value={servings}/>
                               </Servings_Text>
                                <div>Serving Size: {food.serving_qty} {food.serving_unit}</div>
                               
                                {/* <select name="" id="">
                                    {food.alt_measures && food.alt_measures.map(alt => {
                                        return (
                                            <option key={alt.measure}>{alt.measure}</option>
                                        )
                                    })}
                                </select> */}
                            </Servings>
                            <div onClick={() => {set_show_details(!show_details)}}>Show Details</div>
                            {show_details &&
                                <Food_Details>
                                    <Left>
                                        <div>Cals: {(food.calories_per_serving * servings).toFixed()}</div>
                                        <div>Calories Per Serving: {(food.calories_per_serving).toFixed()}</div>
                                        
                                        <div>Carbs: {(food.carbs * servings).toFixed()}</div>
                                        <div>Protein: {(food.protein * servings).toFixed()}</div>
                                        <div>Total Fat: {(food.total_fat * servings).toFixed()}</div>
                                        <div>Trans Fat: {(food.trans_fat * servings).toFixed()}</div>
                                        <div>Sat Fat: {(food.sat_fat * servings).toFixed()}</div>
                                        <div>Poly Fat: {(food.poly_fat * servings).toFixed()}</div>
                                        <div>Mono Fat: {(food.mono_fat * servings).toFixed()}</div>
                                    </Left>
                                    <Right>
                                        <div>Cholesterol: {(food.cholesterol * servings).toFixed()}</div>
                                        <div>Sodium: {(food.sodium * servings).toFixed()}</div>
                                        <div>Potassium: {(food.potassium * servings).toFixed()}</div>
                                        <div>Fiber: {(food.fiber * servings).toFixed()}</div>
                                        <div>Sugar: {(food.sugar * servings).toFixed()}</div>
                                        <div>Vitamin A: {(food.vitamin_a * servings).toFixed()}</div>
                                        <div>Vitamin C: {(food.vitamin_c * servings).toFixed()}</div>
                                        <div>Calcium: {(food.calcium * servings).toFixed()}</div>
                                        <div>Iron: {(food.iron * servings).toFixed()}</div>
                                    </Right>
                                    
                                    
                                    
                                </Food_Details>
                            }
                            <Buttons>
                                <Confirm_Button onClick={handle_confirm}>Confirm</Confirm_Button>
                                <Cancel_Button onClick={() => set_food(null)}>Cancel</Cancel_Button>
                            </Buttons>
                        </Selected_Food>
                    }
                </Bottom>
            </Panel>
            <Overlay active={active}></Overlay>
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Panel = styled.div<{ active: boolean }>`
    display: ${props => props.active ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    background: #222222;
    position: absolute;
    overflow-y: auto;
    z-index: 3; // to prevent recharts legend from clipping through
    width: 400px;
    height: 500px;
    left: calc(50% - 200px);
    top: calc(50% - 250px);
    -webkit-box-shadow: 0px 0px 15px 10px rgba(0,0,0,0.48);
    -moz-box-shadow: 0px 0px 15px 10px rgba(0,0,0,0.48);
    box-shadow: 0px 0px 15px 10px rgba(0,0,0,0.48);

    // @media ${device.lg} {
    //     background: red;
    // }
    

    // @media ${device.md} {
    //     background: green;
    // }

    @media ${device.sm} {
        width: 50%;
        height: 50%;
        top: calc(25%);
        left: calc(25%);
        background: blue;
    }    
`

const Overlay = styled.div<{ active: boolean }>`
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    width: 100%;
    display: ${props => props.active ? "flex" : "none"};
    z-index: 2;
    // pointer-events: none;
`


const Food_Details = styled.div`
    display: flex;
    justify-content: center;
`

const Left = styled.div`
    width: 30%;
    margin-right: 10px;
    /* background: blue; */
    /* padding-left: 10%; */
`
const Right = styled.div`
    width: 30%;
    /* background: red; */
`

const Add_Button = styled(FontAwesomeIcon)`
    cursor: pointer;
    background: ${props => props.theme.background_2};
    border-radius: 50%;
    padding: 1px;
    padding-bottom: 2px;
    :hover {
        background: ${props => props.theme.dp3};
    }
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
    width: 75px;
    height: 75px;
    margin-top: 5px;
    margin-bottom: 5px;
`

const Panel_Title = styled.div`
    margin: 5px;
    font-size: 24px;
    width: 100%;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px;
`
const Bottom = styled.div`
    height: calc(100% - 25px); // 10px for padding, rest for top size
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    width: 100%;
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
    margin-top: 20px;
`

const Selected_Food = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const View_Buttons = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const View_Button = styled.div<{active: boolean}>`
    background: ${props => props.active ? props.theme.dp5 : props.theme.dp1};
    padding: 5px;
    border-radius: 3px;
    margin: 5px;
    cursor: pointer;

    :hover {
        background: ${props => props.theme.dp5};
    }
`

const Servings = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 8px;
    
`

const Servings_Text = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
`

const Food_Name = styled.div`
    font-size: 24px;
    text-align: center;
    padding: 8px;
`

const Servings_Input = styled.input`
    background: ${props => props.theme.dp5};
    border: none;
    width: 30px;
    margin-left: 3px;
    text-align: center;
    padding: none;
    border-radius: 3px;
`