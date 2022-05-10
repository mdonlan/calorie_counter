import axios from 'axios'
import superagent from 'superagent'
import { set_food_items_today, set_logged_in, set_username, store } from './store'

let stored_token = null;
const host = 'http://192.168.0.224:3000'; // for dev purposes, allows access on different computers on same network
// const host = 'http://localhost:3000';

// search the nutritionix api for matching foods
// returns two arrays, branded and common
export function search_foods_nutritionix(query) {
    return axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}&detailed=true`, {
        headers: {
            "x-app-id": "19cbe08c",
            "x-app-key": "8dffdef9be5f87ff5ce316816ca87b0a"
        }
    })
    .then(res => {
        console.log(res.data);
        return res;
    })
    .catch(e => {
        console.log(e);
    })
}

export function search_foods_user_created(query) {
    console.log('search_food_user_created')
    return axios.get(`${host}/search_foods_user_created?query=${query}`, {
        headers: {
            "Authorization" : `Bearer ${stored_token}`
        }
    })
    .then(res => {
        console.log(res.data);
        return res;
    })
    .catch(e => {
        console.log(e);
    })
}

// get nutrient info for a specific item
export function get_item(query) {
    return axios({
        method: "POST",
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        headers: {
            "x-app-id": "19cbe08c",
            "x-app-key": "8dffdef9be5f87ff5ce316816ca87b0a"
        },
        data: {
            "query": query,
        }
    })
    .then(res => {
        // console.log(res);
        return res;
    })
    .catch(e => {
        console.log(e);
    })
}

export function get_data_from_db(query) {
    return axios.get(`${host}`)
    .then(res => {
        return res;
    })
    .catch(e => {
        console.log(e);
    })
}

export function get_food_from_today() {
    // const today = new Date();
    // console.log("today: ", today);
    // console.log("today date string: ", today.toDateString())
    return axios.get(`${host}/get_food_from_today`)
    .then(res => {
        // console.log(res);
        store.dispatch(set_food_items_today(res.data.rows));
        // return res.data.rows;
    })
    .catch(e => {
        console.log(e);
    })
}

export function add_food_to_log(new_food) {
    const token = localStorage.getItem("token");

    const data = {
        food: new_food,
        token: token,
    }

    return axios({
        method: "POST",
        url: `${host}/add_food_to_log`,
        data: data
    })
    .then(res => {
        // console.log(res);
    })
    .catch(e => {
        console.log(e);
    })
    // return axios.get(`${host}/add_food_to_log?food=${food_name}`)
    // .then(res => {
    //     console.log(res);
    //     return res.data.rows;
    // })
    // .catch(e => {
    //     console.log(e);
    // })
}

export function delete_food_from_log(food) {
    // how to find which food to delete from db?
    // should each food entered have a unique id?
    console.log("deleting food")
    return axios({
        method: "POST",
        url: `${host}/delete_food_from_log`,
        data: {food: food}
    })
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })
}

export function register_user(data) {
    console.log(data)
    return axios({
        method: "POST",
        url: `${host}/register_user`,
        data: data
    })
    .then(res => {
        // console.log(res);
        localStorage.setItem("token", res.data.token);
        return res.data.message;
    })
    .catch(e => {
        // console.log(e);
        console.log(e.response);
        return e.response.data;
    })
}

export function validate_token(token) {
    return axios({
        method: "POST",
        url: `${host}/validate_token`,
        data: { token: token }
    })
    .then(res => {
        // console.log(res);
        if (res.data.valid_token) {
            store.dispatch(set_logged_in(true));
            store.dispatch(set_username(res.data.username));
        }
    })
    .catch(e => {
        console.log(e);
    })
}

// get food details for an array of foods
export async function get_food_details(foods) {
    // const foods = ['pizza', 'pasta', 'tacos'];

    const results = [];

    for (let i = 0; i < foods.length; i++) {
        const details = await get_details(foods[i]);
        results.push(details.data.foods[0]);
        // console.log(details.data.foods[0].food_name)
        // console.log(details.data.foods[0].nf_calories)
    }

    return results;
}

async function get_details(query) {
    return axios({
        method: "POST",
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        headers: {
            "x-app-id": "19cbe08c",
            "x-app-key": "8dffdef9be5f87ff5ce316816ca87b0a"
        },
        data: { "query": query }
    })
    .then(res => {
        // console.log(res);
        return res;
    })
    .catch(e => {
        console.log(e);
    })
}

export function update_log_item_qty(item, qty) {
    const token = localStorage.getItem("token");

    const data = {
        item: item,
        qty: qty,
        token: token,
    }

    // console.log("update_log_item_qtd data: ", data);

    return axios({
        method: "POST",
        url: `${host}/update_log_item`,
        data: data
    })
    .then(res => {
        // console.log(res);
        // after we update an item, get the new data from db to show user
        get_food_from_today();
        return res;
    })
    .catch(e => {
        console.log(e);
    })
}

export function get_weekly_calories() {
    const token = localStorage.getItem("token");

    return axios({
        method: "POST",
        url: `${host}/get_weekly_calories`,
        data: {"token": token}
    })
    .then(res => {
        // console.log(res);
        return res.data;
    })
    .catch(e => {
        console.log(e);
    })
}

export function login(data, history) {
    console.log('login');
    console.log(data);

    return superagent.post(`${host}/login`)
    .send({ username: data.username, password: data.password })
    .then(res => {
        console.log(res);
        console.log('logged in')
        localStorage.setItem("token", res.body.token);
        // store.dispatch(set_token(res.body.token));
        store.dispatch(set_logged_in(true));
        // history.push("/");
        return res.body.message;
    })
    .catch(e => {
        console.log(e)
        return e.message;
    })
}

export function create_user_food(data) {
    console.log('create_user_food');
    console.log(data);

    return superagent.post(`${host}/create_user_food`)
    .send({"data": data, "token": stored_token})
    .then(res => {
        console.log(res);
        console.log("successfully created new user food")
        return res.body.message;
    })
    .catch(e => {
        console.log(e)
        return e.message;
    })
}

export function check_for_token() {
    const token = localStorage.getItem("token");
    if (token) {
        stored_token = token;
    }
    return token;
}

export function get_recent_foods() {
    // console.log("store_token: " + stored_token)
    return superagent.post(`${host}/get_recent_foods`)
    .send({"token": stored_token})
    .set('accept', 'json')
    .then(res => {
        console.log(res.body);
        return res.body
    })
    .catch(e => {
        console.log(e);
    })
}