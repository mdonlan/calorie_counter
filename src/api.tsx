import axios from 'axios'
import superagent from 'superagent'
import { set_logged_in, set_username, set_user_data, set_daily_food_items, store } from './store'
import { Food } from './Types';
// import { Weight_Entry } from './Components/Weight'

let stored_token = null;
const host = "https://calorieserver.michaeldonlan.com";
// const host = 'http://157.230.58.188:3000';
// const host = 'https://192.168.0.224:3000'; // for dev purposes, allows access on different computers on same network
// const host = 'http://localhost:3000';

// search the nutritionix db for foods based on a query
export function search_food(query) {
    // console.log('searching food')
    return axios.post(`${host}/search_foods_nutritionix`, {
        headers: { "Authorization" : `Bearer ${stored_token}` }, 
        "query": query
    })
    .then(res => { return res.data; })
    .catch(e => { console.log(e); })
}

// // get nutrient info for a specific item
// export function get_nutrients_for_food(query) {
//     return axios({
//         method: "POST",
//         url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
//         headers: {
//             "x-app-id": "19cbe08c",
//             "x-app-key": "8dffdef9be5f87ff5ce316816ca87b0a",
//             "x-remote-user-id": 0,
//         },
//         data: {
//             "query": query,
//         }
//     })
//     .then(res => {
//         console.log("get_nutrients_for_food: ", res);
//         // return res;
//     })
//     .catch(e => {
//         console.log(e);
//     })
// }

export function search_nutritionix_food_nutrients(name) {
    return axios.post(`${host}/search_nutritionix_food_nutrients`, 
        { "food_name": name, "token": stored_token }
    )
    .then(res => {
        // console.log(res);
        return res.data.foods[0];
        // store.dispatch(set_food_items_today(res.data.rows));
    })
    .catch(e => console.log(e))
}


// get all user foods from today
// export function get_food_from_today() {
//     return axios.get(`${host}/get_food_from_today`)
//     .then(res => {
//         store.dispatch(set_food_items_today(res.data.rows));
//     })
//     .catch(e => console.log(e))
// }

export function get_food_from_date(date: Date) {
    return axios.post(`${host}/get_food_from_date`,
    {"token": stored_token, "date": date})
    .then(res => {
        console.log(res.data.rows)
        store.dispatch(set_daily_food_items(res.data.rows));
    })
    .catch(e => console.log(e))
}

// add a new food to the users food log
export function add_food_to_log(new_food: Food, date: Date) {
    return axios.post(`${host}/add_food_to_log`,
       { "food": new_food, "date": date, "token": stored_token }
    )
    .then(res => {
        // get_nutrients_for_food(new_food.food_name);
    })
    .catch(e => console.log(e) )
}

// delete a food from the users food log
export function delete_food_from_log(food) {
    return axios.post(`${host}/delete_food_from_log`, 
        { "food": food }
    )
    // .then(res => console.log(res))
    .catch(e => console.log(e))
}

// register a new user
export function register_user(data) {
    return axios.post(`${host}/register_user`, 
       { "data": data }
    )
    .then(res => {
        localStorage.setItem("token", res.data.token);
        stored_token = res.data.token;
        return res.data.message;
    })
    .catch(e => {
        console.log(e.response);
        return e.response.data;
    })
}

export function validate_token(token) {
    console.log("validating token: " + token);
    return axios.post(`${host}/validate_token`, 
        { "token": token }
    )
    .then(async (res) => {
        console.log(res.data);
        if (res.data.valid_token) {
            store.dispatch(set_logged_in(true));
            store.dispatch(set_username(res.data.username));
            stored_token = token;
            const user_data = await get_user_data();
            console.log(user_data)
            store.dispatch(set_user_data(user_data));
        }
    })
    .catch(e => {
        console.log(e);
    })
}

// // get food details for an array of foods
// export async function get_food_details(foods) {
//     // const foods = ['pizza', 'pasta', 'tacos'];

//     const results = [];

//     for (let i = 0; i < foods.length; i++) {
//         const details = await get_details(foods[i]);
//         results.push(details.data.foods[0]);
//         // console.log(details.data.foods[0].food_name)
//         // console.log(details.data.foods[0].nf_calories)
//     }

//     return results;
// }

// async function get_details(query) {
//     return axios({
//         method: "POST",
//         url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
//         headers: {
//             "x-app-id": "19cbe08c",
//             "x-app-key": "8dffdef9be5f87ff5ce316816ca87b0a"
//         },
//         data: { "query": query }
//     })
//     .then(res => {
//         // console.log(res);
//         return res;
//     })
//     .catch(e => {
//         console.log(e);
//     })
// }

// updates an existing food item in the users food log
export function update_log_item_qty(item, qty) {
    const data = {
        item: item,
        qty: qty,
        token: stored_token,
    };
    return axios.post(`${host}/update_log_item`, 
        { "data": data }
    )
    .then(res => {
        // after we update an item, get the new data from db to show user
        // get_food_from_today();
        // console.log(res);
        return res;
    })
    .catch(e => {
        console.log(e);
    })
}

export function get_weekly_calories() {
    return axios.post(`${host}/get_weekly_calories`, 
        { "token": stored_token }
    )
    .then(res => res.data)
    .catch(e => console.log(e))
}

// // Example POST method implementation:
// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
//   }
  
  
  

export function login(data) {
    // postData(`${host}/login`, { username: "test", password: "test" })
    // .then((data) => {
    //   console.log(data); // JSON data parsed by `data.json()` call
    // });
    // return superagent.post(`${host}/login`)
    // .send({ username: data.username, password: data.password })
    // .then(res => {
    //     localStorage.setItem("token", res.body.token);
    //     stored_token = res.body.token;
    //     // store.dispatch(set_token(res.body.token));
    //     store.dispatch(set_logged_in(true));
    //     return res.body.message;
    // })
    // .catch(e => {
    //     console.log(e)
    //     return e.message;
    // })
    console.log("start of login--api");
    return superagent.post(`${host}/login/`)
    .send({ username: data.username, password: data.password })
    .then(res => {
        console.log(res.body);
        localStorage.setItem("token", res.body.token);
        stored_token = res.body.token;
        // store.dispatch(set_token(res.body.token));
        store.dispatch(set_logged_in(true));
        return res.body.message;
    })
    .catch(e => {
        console.log("LOGIN ERROR");
        console.log(e)
        return e.message;
    })
    // return axios.post(`${host}/login/`, { username: data.username, password: data.password })
    // .then(res => {
    //     console.log(res);
    //     localStorage.setItem("token", res.data.token);
    //     stored_token = res.data.token;
    //     // store.dispatch(set_token(res.body.token));
    //     store.dispatch(set_logged_in(true));
    //     return res.data.message;
    // })
    // .catch(e => {
    //     console.log("LOGIN ERROR");
    //     console.log(e)
    //     return e.message;
    // })
}

// export function create_user_food(data) {
//     console.log('create_user_food');
//     console.log(data);

//     return superagent.post(`${host}/create_user_food`)
//     .send({"data": data, "token": stored_token})
//     .then(res => {
//         console.log(res);
//         console.log("successfully created new user food")
//         return res.body.message;
//     })
//     .catch(e => {
//         console.log(e)
//         return e.message;
//     })
// }

export function check_for_token() {
    const token = localStorage.getItem("token");
    if (token) {
        stored_token = token;
    }
    return token;
}

export function get_recent_foods() {
    return superagent.post(`${host}/get_recent_foods`)
    .send({"token": stored_token})
    .set('accept', 'json')
    .then(res => res.body)
    .catch(e => console.log(e))
}

export function get_weight() {
    return superagent.post(`${host}/get_weight`)
    .send({"token": stored_token})
    .then(res => res.body)
    .catch(e => console.log(e))
}

export function add_weight_entry(weight) {
    return superagent.post(`${host}/add_weight_entry`)
    .send({"token": stored_token, "weight": weight})
    .then(res => {return res.body})
    .catch(e => console.log(e))
}

export function get_monthly_weight_change() {
    return superagent.post(`${host}/get_monthly_weight_change`)
    .send({"token": stored_token})
    .then(res => {return res.body})
    .catch(e => console.log(e))
}

export function get_user_data() {
    return superagent.post(`${host}/get_user_data`)
    .send({"token": stored_token})
    .then(res => {return res.body})
    .catch(e => console.log(e))
}

export function search_upc(upc) {
    console.log("upc_code: " + upc);
    return superagent.post(`${host}/search_upc`)
    .send({"token": stored_token, "upc": upc})
    .then(res => {return res.body})
    .catch(e => console.log(e))
}