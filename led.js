// http://johnny-five.io/examples/led/
// http://led.linear1.org/1led.wiz

const five = require("johnny-five");
const board = new five.Board();

board.on("ready", function() {
    const led = new five.Led(3);

    // This will grant access to the led instance
    // from within the REPL that's created when
    // running this program.
    this.repl.inject({
        led: led
    });

    led.blink();
});
