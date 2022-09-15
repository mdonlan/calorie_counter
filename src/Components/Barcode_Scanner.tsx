import React, { Component, useEffect } from "react";
import Quagga, { QuaggaJSConfigObject } from "@ericblade/quagga2";
import styled from 'styled-components'

export function Barcode_Scanner() {

    function onDetected() {
        console.log("detected");
    }

    useEffect(() => {
        console.log("barcode scanner useEffect!")
       
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

        Quagga.init(
            config,
            function (err) {
              if (err) {
                console.log(err);
                return;
              }
              console.log("Initialization finished. Ready to start");
              Quagga.start();
            }
          );
          
          Quagga.onDetected(function (result) {
            console.log(result)
            // var code = result.codeResult.code;
            // console.log(code);
            // document.getElementById("output").innerHTML = result.codeResult.code;
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
            {/* <div id="output"></div> */}
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

