import React, { useState } from 'react'
import styled from 'styled-components';
import { create_user_food } from '../api';

export function Create_User_Food() {

    const unit_types = [
        "cups",
        "teaspoons",
        "tablespoons",
        "ounces",
        "slice"
    ];

    const [food_name, set_food_name] = useState('');
    const [serving_size_unit, set_serving_size_unit] = useState(unit_types[0]);
    const [serving_size, set_serving_size] = useState(1);
    const [cals_per_serving, set_cals_per_serving] = useState(0);
    const [carbs, set_carbs] = useState(0);
    const [protein, set_protein] = useState(0);
    const [total_fat, set_total_fat] = useState(0);
    const [trans_fat, set_trans_fat] = useState(0);
    const [sat_fat, set_sat_fat] = useState(0);
    const [poly_fat, set_poly_fat] = useState(0);
    const [mono_fat, set_mono_fat] = useState(0);
    const [cholesterol, set_cholesterol] = useState(0);
    const [sodium, set_sodium] = useState(0);
    const [potassium, set_potassium] = useState(0);
    const [fiber, set_fiber] = useState(0);
    const [sugar, set_sugar] = useState(0);
    const [vitamin_a, set_vitamin_a] = useState(0);
    const [vitamin_c, set_vitamin_c] = useState(0);
    const [calcium, set_calcium] = useState(0);
    const [iron, set_iron] = useState(0);

    /*
        name
        serving size
        serving unit
        servings per container?
        calories per serving
        total fat
            trans fat
            saturated fat
            polyunsaturated fat
            monounsaturated fat
        cholesterol
        sodium
        potassium
        carbs
        fiber
        sugar
        protein
        Vitamin A
        Vitamin C
        Calcium
        Iron
    */

    async function handle_submit() {
        console.log("submitting create user food")
        const result = await create_user_food({
            "food_name": food_name,
            "serving_size_unit": serving_size_unit,
            "serving_size": serving_size,
            "cals_per_serving": cals_per_serving,
            "carbs": carbs,
            "protein": protein,
            "total_fat": total_fat,
            "trans_fat": trans_fat,
            "sat_fat": sat_fat,
            "poly_fat": poly_fat,
            "mono_fat": mono_fat,
            "cholesterol": cholesterol,
            "sodium": sodium,
            "potassium": potassium,
            "fiber": fiber,
            "sugar": sugar,
            "vitamin_a": vitamin_a,
            "vitamin_c": vitamin_c,
            "calcium": calcium,
            "iron": iron
        });
        console.log(result)
    }

    return(
        <Wrapper>
            <Row>
                <Desc>Food Name</Desc>
                <Input onChange={e => {set_food_name(e.target.value)}} value={food_name} placeholder='food name'></Input>
            </Row>
            <Row>
                <Desc>serving unit</Desc>
                <select onChange={e => {set_serving_size_unit(e.target.value)}} value={serving_size_unit}>
                    {unit_types.map((type, i) => {
                        return (
                            <option key={i}>{type}</option>
                        )
                    })}
                </select>
            </Row>
            <Row>
                <Desc>Serving Size</Desc>
                <Input onChange={e => {set_serving_size(e.target.value)}} value={serving_size}></Input>
            </Row>
            <Row>
                <Desc>Cals per serving</Desc>
                <Input onChange={e => {set_cals_per_serving(e.target.value)}} value={cals_per_serving}></Input>
            </Row>
            <Row>
                <Desc>Carbs</Desc>
                <Input onChange={e => {set_carbs(e.target.value)}} value={carbs}></Input>
            </Row>
            <Row>
                <Desc>Protein</Desc>
                <Input onChange={e => {set_protein(e.target.value)}} value={protein}></Input>
            </Row>
            <Row>
                <Desc>Total Fat</Desc>
                <Input onChange={e => {set_total_fat(e.target.value)}} value={total_fat}></Input>
            </Row>
            <Row>
                <Desc>Saturated Fat</Desc>
                <Input onChange={e => {set_sat_fat(e.target.value)}} value={sat_fat}></Input>
            </Row>
            <Row>
                <Desc>Polyunsaturated Fat</Desc>
                <Input onChange={e => {set_poly_fat(e.target.value)}} value={poly_fat}></Input>
            </Row>
            <Row>
                <Desc>Monounsaturated Fat</Desc>
                <Input onChange={e => {set_mono_fat(e.target.value)}} value={mono_fat}></Input>
            </Row>
            <Row>
                <Desc>Cholesterol</Desc>
                <Input onChange={e => {set_cholesterol(e.target.value)}} value={cholesterol}></Input>
            </Row>
            <Row>
                <Desc>Sodium</Desc>
                <Input onChange={e => {set_sodium(e.target.value)}} value={sodium}></Input>
            </Row>
            <Row>
                <Desc>Potassium</Desc>
                <Input onChange={e => {set_potassium(e.target.value)}} value={potassium}></Input>
            </Row>
            <Row>
                <Desc>Fiber</Desc>
                <Input onChange={e => {set_fiber(e.target.value)}} value={fiber}></Input>
            </Row>
            <Row>
                <Desc>Sugar</Desc>
                <Input onChange={e => {set_sugar(e.target.value)}} value={sugar}></Input>
            </Row>
            <Row>
                <Desc>Vitamin A</Desc>
                <Input onChange={e => {set_vitamin_a(e.target.value)}} value={vitamin_a}></Input>
            </Row>
            <Row>
                <Desc>Calcium</Desc>
                <Input onChange={e => {set_calcium(e.target.value)}} value={calcium}></Input>
            </Row>
            <Row>
                <Desc>Iron</Desc>
                <Input onChange={e => {set_iron(e.target.value)}} value={iron}></Input>
            </Row>
            <div onClick={() => {handle_submit()}}>create</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
`

const Desc = styled.div``
const Input = styled.input``
