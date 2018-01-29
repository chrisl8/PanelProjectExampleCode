const five = require("johnny-five"),
    board = new five.Board();

board.on("ready", function () {
    // Create an Led on pin 13 (the builtin LED)
    const led = new five.Led(13);

    // Strobe the pin on/off, defaults to 100ms phases
    led.strobe();
});
