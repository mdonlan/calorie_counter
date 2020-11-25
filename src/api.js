import axios from 'axios'

// search the nutritionix api for matching foods
// returns two arrays, branded and common
export function search_foods(query) {
    return axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}`, {
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
        console.log(res);
        return res;
    })
    .catch(e => {
        console.log(e);
    })
}

export function get_data_from_db(query) {
    return axios.get(`http://localhost:3000`)
    .then(res => {
        return res;
    })
    .catch(e => {
        console.log(e);
    })
}

export function get_food_from_date() {
    return axios.get(`http://localhost:3000/get_food_from_date?date=${Date.now()}`)
    .then(res => {
        return res;
    })
    .catch(e => {
        console.log(e);
    })
}