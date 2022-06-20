export interface User_Data {
    username: string;
    daily_calorie_target: number;
};

export interface Food {
    food_name: string;
    calories_per_serving: number;
    servings: number;
    meal: string; 
    // serving_size: number;
    carbs: number;
    protein: number;
    total_fat: number;
    trans_fat: number;
    sat_fat: number;
    poly_fat: number;
    mono_fat: number;
    cholesterol: number;
    sodium: number;
    potassium: number;
    fiber: number;
    sugar: number;
    vitamin_a: number;
    vitamin_c: number;
    calcium: number;
    iron: number;
    serving_unit: string;
    alt_measures: Alt_Measure[];
}

export interface Alt_Measure {
    measure: string;
    qty: number,
    seq: number,
    serving_weight: number
};