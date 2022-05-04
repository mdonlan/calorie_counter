import { combineReducers, configureStore, createReducer, createSlice } from '@reduxjs/toolkit'

export type RootState = ReturnType<typeof store.getState>

const default_slice = createSlice({
    name: 'slice',
    initialState: {
        logged_in: false,
        username: null,
        food_items_today: [],
        add_food_selection: null,
        recent_foods: []
    },
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

        set_add_food_selection: (state, action) => {
            state.add_food_selection = action.payload;
        },

        set_recent_foods: (state, action) => {
            state.recent_foods = action.payload;
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
    set_add_food_selection
} = default_slice.actions;

export default default_slice.reducer;

export const store = configureStore({ reducer: reducer});