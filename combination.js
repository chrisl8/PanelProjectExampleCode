// Test combining functions together.
// https://github.com/ajfisher/node-pixel

const pixel = require("node-pixel");
const five = require("johnny-five");
const { exec } = require('child_process');
const shadeBlendConvert = require('./shadeBlendConvert');

const board = new five.Board();
let strip = null;
let pixelsReady = false;

board.on("ready", function () {

    const led = new five.Led(3);
    led.on();

    // This will grant access to the led instance
    // from within the REPL that's created when
    // running this program.
    this.repl.inject({
        led: led
    });

    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [{ pin: 6, length: 1 },], // this is preferred form for definition
        gamma: 2.8, // set to a gamma that works nicely for WS2812
    });

    strip.on("ready", function () {
        // do stuff with the strip here.
        strip.colour("teal");
        strip.show();
        pixelsReady = true;
    });

    const button = new five.Button({
        pin: 12,
        isPullup: true
    });

    button.on("press", function () {
        console.log("Button pressed");
        led.off();
        if (pixelsReady) {
            const color = shadeBlendConvert(-0.6, "rgb(0, 255, 0)");
            strip.color(color);
            strip.show();
        }
        exec('aplay ~/.arlobot/sounds/affirmative.wav');
    });

    button.on("release", function () {
        // This will repeat ever 100ms, or however often set by 'holdtime' on button instance
        console.log("Button released");
        if (pixelsReady) {
            const color = shadeBlendConvert(-0.6, "rgb(255, 0, 0)");
            strip.color(color);
            strip.show();
        }
        led.on();
    });

    // Create a new `potentiometer` hardware instance.
    const potentiometer = new five.Sensor({
        pin: "A2",
        threshold: 2, // This will emit a 'change' if it changes by this much.
        freq: 250 // This will emit data every x milliseconds, even if no change has occured.
    });

    // Inject the `sensor` hardware into
    // the Repl instance's context;
    // allows direct command line access
    board.repl.inject({
        pot: potentiometer
    });

    // "data" get the current reading from the potentiometer
    /*
    potentiometer.on("data", function() {
      console.log(this.value, this.raw);
    });
    */

    potentiometer.on("change", function () {
        console.log('Change', this.value, this.raw);
    })

});

