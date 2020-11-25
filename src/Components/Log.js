import React, { useEffect, useState } from 'react'
import { get_data_from_db, get_food_from_date } from '../api'

export function Log() {
    const [all_data, set_all_data] = useState(null);

    useEffect(() => {
        // console.log('log')
        // get_data_from_db()
        // .then(res => {
        //     console.log(res)
        //     // set_all_data(res.data);
        // })
        // get_item("pasta");
        get_food_from_date();
    }, [])

    return (
        <div>
            {/* {all_data &&
                all_data.map(item => {
                    <div>blah</div>
                })
            } */}
        </div>
    )
}