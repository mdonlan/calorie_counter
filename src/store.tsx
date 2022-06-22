import { combineReducers, configureStore, createReducer, createSlice } from '@reduxjs/toolkit'
import { User_Data } from './Types';
import { Food } from './Types';


export interface Initial_State {
    logged_in: boolean;
    username: string;
    food_items_today: Food[];
    daily_food_items: Food[];
    recent_foods: [];
    user_data: User_Data;
}

const initial_state: Initial_State = {
    logged_in: false,
    username: null,
    food_items_today: [],
    daily_food_items: [],
    recent_foods: [],
    user_data: {
        username: null,
        daily_calorie_target: 0
    }
};

const default_slice = createSlice({
    name: 'slice',
    initialState: initial_state,
    reducers: {
        set_logged_in: (state, action) => {
            state.logged_in = action.payload;
        },

        set_username: (state, action) => {
            state.username = action.payload;
        },

        set_food_items_today: (state, action) => {
            state.food_items_today = action.payload;
        },

        // set_add_food_selection: (state, action) => {
        //     state.add_food_selection = action.payload;
        // },

        set_recent_foods: (state, action) => {
            state.recent_foods = action.payload;
        },

        set_user_data: (state, action) => {
            state.user_data = action.payload;
        },

        set_daily_food_items: (state, action) => {
            state.daily_food_items = action.payload;
        }
    }
});

const reducer = combineReducers({
    default: default_slice.reducer
})



export const {
    set_logged_in,
    set_username,
    set_food_items_today,
    // set_add_food_selection,
    set_user_data,
    set_daily_food_items
} = default_slice.actions;

export default default_slice.reducer;

export const store = configureStore({ reducer: reducer});
export type RootState = ReturnType<typeof store.getState>