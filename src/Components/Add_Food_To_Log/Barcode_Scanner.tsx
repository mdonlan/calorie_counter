import React, { Component, useEffect, useRef, useState } from "react";
import Quagga, { QuaggaJSConfigObject } from "@ericblade/quagga2";
import styled from 'styled-components'
import { search_upc } from "../../api";
import { Food } from "../../Types";
import { convert_nutritionix_food } from '../../api'

let last_lookup_time = performance.now();

export function Barcode_Scanner(props) {
    const [scanned_food, set_scanned_food] = useState(null);
    // const [last_lookup_time, set_last_lookup_time] = useState(performance.now());

    useEffect(() => {
        // console.log("barcode scanner useEffect!")
       
        const config: QuaggaJSConfigObject = {
            // debug: true,
            locate: false,
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector("#viewport"),
                // constraints: {
                //     width: 200,
                //     height: 200
                // }
            },
            decoder: {
                readers: ["upc_reader"],
                // debug: {
                //     drawScanline: true,
                //     drawBoundingBox: true,
                //     showFrequency: true,
                //     showPattern: true
                // }
            },
            locator: {
                halfSample: true,
                patchSize: "small", // x-small, small, medium, large, x-large
                // debug: {
                //   showCanvas: false,
                //   showPatches: false,
                //   showFoundPatches: false,
                //   showSkeleton: false,
                //   showLabels: false,
                //   showPatchLabels: false,
                //   showRemainingPatchLabels: false,
                //   boxFromPatches: {
                //     showTransformed: false,
                //     showTransformedBox: false,
                //     showBB: false
                //   }
                // }
              }
        };

        function get_nutrient(food, index) {
            const value = food.full_nutrients.find(a => a.attr_id == index);
            if (value == undefined) return 0;
            return value.value;
        }

        // function convert_nutritionix_food(food) {
        //     // console.log("nutritionix_food: ", nutritionix_food);
    
        //     const new_food: Food = {
        //         food_name: food.food_name,
        //         calories_per_serving: get_nutrient(food, 208),
        //         servings: 1,
        //         serving_qty: food.serving_qty,
        //         // serving_size: food.serving_unit,
        //         carbs: get_nutrient(food, 205),
        //         protein: get_nutrient(food, 203),
        //         total_fat: get_nutrient(food, 204),
        //         trans_fat: get_nutrient(food, 605),
        //         sat_fat: get_nutrient(food, 606),
        //         poly_fat: get_nutrient(food, 646),
        //         mono_fat: get_nutrient(food, 645),
        //         cholesterol: get_nutrient(food, 601),
        //         sodium: get_nutrient(food, 307),
        //         potassium: get_nutrient(food, 306),
        //         fiber: get_nutrient(food, 291),
        //         sugar: get_nutrient(food, 269),
        //         vitamin_a: get_nutrient(food, 318),
        //         vitamin_c: get_nutrient(food, 401),
        //         calcium: get_nutrient(food, 301),
        //         iron: get_nutrient(food, 303),
        //         meal:  props.meal,
        //         serving_unit: food.serving_unit,
        //         alt_measures: []
        //     }
    
        //     // console.log(food);
        //     return new_food;
        // }

        Quagga.init(
            config,
            function (err) {
              if (err) {
                console.log(err);
                return;
              }
            //   console.log("Initialization finished. Ready to start");
              Quagga.start();
            }
          );
          
          Quagga.onDetected(async function (detected) {
            console.log(performance.now() - last_lookup_time)
            if (performance.now() - last_lookup_time < 1000) {
                return;
            }

            // set_last_lookup_time(performance.now());
            last_lookup_time = performance.now();
            var code = detected.codeResult.code;
            // console.log(code);
            // document.getElementById("output").innerHTML = result.codeResult.code;
            

            const result = await search_upc(code);
            console.log("result: ", result);

            const converted_food = convert_nutritionix_food(result, props.meal);
            console.log('converted_food: ', converted_food);
            props.set_food(converted_food);

            Quagga.stop();
            // if (!result || result.foods.length == 0) {
            //     console.log("No foods found matching upc");
            // } else {
            //     const food_found = result.foods[0];
            //     console.log(result);
            //     // output_ref.current.innerHTML = code;
            //     set_scanned_food(food_found);
            // }

            
          });

          Quagga.onProcessed(function (result) {
            // console.log(result)

            var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                // drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    if (result.boxes) {
                        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                        result.boxes.filter(function (box) {
                            return box !== result.box;
                        }).forEach(function (box) {
                            Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                        });
                    }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "blue", lineWidth: 2});
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
                }
            }
          });
          

        
    }, [])

    return (
        <>
            <Viewport id="viewport"></Viewport>
            {/* <div ref={output_ref}>output</div> */}
            {scanned_food &&
                <div>
                    <div>{scanned_food.food_name}</div>
                    <div>{scanned_food.nix_brand_name}</div>
                    <image href={scanned_food.photo.thumb}></image>
                </div>
            }
        </>
    )
}

const Viewport = styled.div`
    // background: black;
    position: relative;
    height: 100%;
    width: 100%;

    & canvas {
        position: absolute;
        top: 0px;
        left: 0px;
        height: 75%;
        width: 75%;
        // border: 3px solid green;
    }

    & video {
        position: absolute;
        top: 0px;
        left: 0px;
        height: 75%;
        width: 75%;
        // border: 3px solid green;
        // z-index: 0;
    }
`

