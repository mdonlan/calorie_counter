import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { get_item } from './api';

export function Food() {
    const location = useLocation();

    const [item, set_item] = useState(null);

    useEffect(async () => {
        const name = location.search.substr(1, location.search.length - 1);
        const result = await get_item(name);
        console.log(result)
        set_item(result.data.foods[0]);
    }, [])

    return (
        <div>
            <div>food</div>
            {item &&
                <div>
                    <div>{item.food_name}</div>
                    <div>calories: {item.nf_calories}</div>
                    <div>fat: {item.nf_total_fat}</div>
                    <div>soduium: {item.nf_sodium}</div>
                    <div>carbs: {item.nf_total_carbohydrate}</div>
                    <div>fiber: {item.nf_dietary_fiber}</div>
                    <div>sugar: {item.nf_sugars}</div>
                    <div>protein: {item.nf_protein}</div>
                </div>
            }
        </div>
    )
}