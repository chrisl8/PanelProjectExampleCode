// https://github.com/ajfisher/node-pixel

/*
    You need a different Firmata for the Neopixel library to work.
    I wasn't able to make any of the automated programs written work,
    so I just found the firmata in the node_modules folder
    node_modules/node-pixel/firmware/build/node_pixel_firmata
    Opened it,
    and Installed it to the Arduino directly.

    If you just have the normal Firmata on the board you will get this error:
    IncorrectFirmataVersionError: Please upload NodePixel Firmata to the board
 */

const pixel = require("node-pixel");
const five = require("johnny-five");
const shadeBlendConvert = require('./shadeBlendConvert');

const board = new five.Board();
let strip;
let pixelsReady = false;

const colorList = [
    {
        name: "Red",
        rgb: "rgb(255, 0, 0)",
    },
    {
        name: "Green",
        rgb: "rgb(0, 255, 0)",
    },
    {
        name: "Yellow",
        rgb: "rgb(255, 255, 0)",
    },
    {
        name: "Blue",
        rgb: "rgb(0, 0, 255)",
    },
];

const brightness = -0.6;

let currentColor = 0;

function displayNextColor() {
    console.log(colorList[currentColor].name);
    const color = shadeBlendConvert(brightness, colorList[currentColor].rgb);
    strip.color(color);
    strip.show();
    if (currentColor < colorList.length - 1) {
        currentColor++;
    } else {
        currentColor = 0;
    }
    setTimeout(displayNextColor, 1000);
}

board.on("ready", function () {

    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [{ pin: 6, length: 1 },], // this is preferred form for definition
        gamma: 2.8, // set to a gamma that works nicely for WS2812
    });

    strip.on("ready", function () {
        // do stuff with the strip here, like show a color
        strip.colour("teal");
        strip.show();
        pixelsReady = true;
        displayNextColor(strip);
    });

});
