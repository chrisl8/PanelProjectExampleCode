// http://johnny-five.io/examples/led-digits-clock-HT16K33/
// http://johnny-five.io/api/led.digits/

const moment = require("moment");
const five = require("johnny-five");
const board = new five.Board();

board.on("ready", function() {
    // "SCL" is Serial Clock
    // "SDA" is Serial DATA
    // This board does not use a 'CS' pin.
    // NOTE: THe pins 20 and 21 are the SAME as the SDA/SDL pins next to the USB plug.

    // The HT16K33 is an i2c device, so they can all plug into the same SDA/SDL lines,
    // you just need to put them on different addresse:
    // https://learn.adafruit.com/adafruit-led-backpack/changing-i2c-address

    // The Johnny Five code SEEMS to just automatically take the first "Digits" device
    // as 0x70 and then the next as 0x71 even without specifying anything.

    const digits = new five.Led.Digits({
        controller: "HT16K33",
    });
    var toggle = 0;
    digits.brightness(1); // Range: 0 to 100

    digits.print("8.8.:.8.8");

    setInterval(function() {
        // Toggle the colon part: on for a second, off for a second.
        digits.print(time(toggle ^= 1));
    }, 1000);
});

function time(showColon) {
    var display = "    " + moment().format(
        showColon ? "h:mm" : "h mm"
    );
    return display.slice(-5);
}

