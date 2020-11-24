import axios from 'axios'

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