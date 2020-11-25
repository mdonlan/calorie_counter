import React, { useEffect, useState } from 'react'
import { get_data_from_db, get_food_from_date } from '../api'

export function Log() {
    const [log_items, set_log_items] = useState([]);

    useEffect(async () => {
        const fetch_foods = async () => {
            const results = await get_food_from_date();
            set_log_items(results);
          }
          fetch_foods();
    }, [])

    return (
        <div>
            <div>Daily Food Log</div>
            {log_items.map(item => {
                return (
                    <div>{item.food_name}</div>
                )
            })}
        </div>
    )
}