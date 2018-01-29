const five = require("johnny-five");
const board = new five.Board();

// http://johnny-five.io/api/button/

let fastVibrationCount = 0;
let mediumVibrationCount = 0;
let slowVibrationCount = 0;

board.on("ready", function () {

    // Create a new `button` hardware instance.
    const button3 = new five.Button({
        pin: 3,
        isPullup: true
    });
    // Create a new `button` hardware instance.
    const button4 = new five.Button({
        pin: 4,
        isPullup: true
    });

    button3.on("hold", function () {
        console.log("Button held");
    });
    button3.on("press", function () {
        console.log("Button pressed");
    });
    button3.on("release", function () {
        // This will repeat ever 100ms, or however often set by 'holdtime' on button instance
        fastVibrationCount++;
        printStatus();
    });

    button4.on("hold", function () {
        console.log("Button held");
    });
    button4.on("press", function () {
        console.log("Button pressed");
    });
    button4.on("release", function () {
        // This will repeat ever 100ms, or however often set by 'holdtime' on button instance
        mediumVibrationCount++;
        printStatus();
    });
});

function printStatus() {
    // This should clear the terminal screen:
    console.log('\x1B[2J\x1B[0f');

    console.log(`Fast Vibration: ${fastVibrationCount}`);
    console.log(`Medium Vibration: ${mediumVibrationCount}`);
    console.log(`Slow Vibration: ${slowVibrationCount}`);
}