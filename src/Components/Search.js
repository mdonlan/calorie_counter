import React, { useEffect, useState } from 'react'
import { search_foods } from '../api.js'

export function Search() {
    
    const [results, set_results] = useState([]);
    const [query, set_query] = useState('');
    
    useEffect(() => {
        if (query.length > 2) {
            search_foods(query)
            .then(res => {
                set_results(res.data);
            })
        }
    }, [query])

    function handle_query_input(e) {
        set_query(e.target.value);
    }

    return (
        <div>
            <div>search!</div>

            <input onChange={handle_query_input} value={query} placeholder="search"></input>

            <div>Common</div>
            {results.common &&
                results.common.map((r, i) => {
                    return (
                        <div key={i}>
                            <img src={r.photo.thumb} />
                            <div>{r.food_name}</div>
                        </div>
                    )
                })
            }

            <div>Branded</div>
            {results.branded &&
                results.branded.map((r, i) => {
                    return (
                        <div key={i}>
                            <img src={r.photo.thumb} />
                            <div>{r.food_name}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}