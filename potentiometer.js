const five = require("johnny-five");
const board = new five.Board();

// http://johnny-five.io/api/sensor/
// http://johnny-five.io/examples/potentiometer/

board.on("ready", function () {

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

// References
//
// http://arduino.cc/en/Tutorial/AnalogInput
