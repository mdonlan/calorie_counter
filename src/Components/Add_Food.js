import React, { useState } from 'react'
import { add_food_to_log } from '../api';
import { Search } from './Search';

export function Add_Food() {
    const [active, set_active] = useState(false);
    const [food, set_food] = useState(null);


    return (
        <div>
            <div onClick={() => {set_active(true)}}>add food</div>
            {active && !food &&
                <div>
                    <Search return_selected={true} set={set_food}/>
                </div>
            }

            {active && food &&
                <div>
                    <div>{food.food_name}</div>
                    <div onClick={() => {add_food_to_log(food.food_name)}}>Confirm</div>
                    <div onClick={() => {set_active(false)}}>Cancel</div>
                </div>
            }

            {active &&
                <div onClick={() => {set_active(false)}}>close</div>
            }

        </div>
    )
}