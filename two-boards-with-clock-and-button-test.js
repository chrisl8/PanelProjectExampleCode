// http://johnny-five.io/examples/led-digits-clock-HT16K33/
// http://johnny-five.io/api/led.digits/

const moment = require("moment-timezone");
const five = require("johnny-five");
const { spawn } = require('child_process');

// https://github.com/rwaldron/johnny-five/blob/master/docs/board-multi.md

// NOTE: You use 'boards' instead of 'board'
// Also, the "ID" must be a string/character in quotes, a number won't work.
// Probably best to just name it clearly.
// This works fine on a raspberry pi though.
const boards = new five.Boards(["A", "B"]);

boards.on("ready", function () {
    // "SCL" is Serial Clock
    // "SDA" is Serial DATA
    // This board does not use a 'CS' pin.
    // NOTE: THe pins 20 and 21 are the SAME as the SDA/SDL pins next to the USB plug.

    // The HT16K33 is an i2c device, so they can all plug into the same SDA/SDL lines,
    // you just need to put them on different addresse:
    // https://learn.adafruit.com/adafruit-led-backpack/changing-i2c-address

    // The Johnny Five code SEEMS to just automatically take the first "Digits" device
    // as 0x70 and then the next as 0x71 even without specifying anything.
    const clock1 = new five.Led.Digits({
        controller: "HT16K33",
        board: this.byId("A"),
    });
    let toggleClock1 = 0;

    const clock2 = new five.Led.Digits({
        controller: "HT16K33",
        board: this.byId("A"),
    });
    let toggleClock2 = 0;

    // Create a new `button` hardware instance.
    const button = new five.Button({
        pin: 8,
        isPullup: true,
        board: this.byId("B"),
    });

    let timeZoneIndex = 0;
    const timeZoneList = ["America/Los_Angeles", "America/Denver", "America/Chicago", "America/New_York"];

    button.on("press", function () {
        spawn("aplay", ['whoa-short.wav']);
        // console.log("Button pressed");
        if (timeZoneIndex === timeZoneList.length - 1) {
            timeZoneIndex = 0;
        } else {
            timeZoneIndex++;
        }
        console.log(`Time Zone: ${timeZoneList[timeZoneIndex]}`);
        console.log();
        clock2.print(time(toggleClock2, timeZoneList[timeZoneIndex]));
    });

    setInterval(function () {
        // Toggle the colon part: on for a second, off for a second.
        clock1.print(time(toggleClock1 ^= 1, "America/Chicago"));
        clock2.print(time(toggleClock2 ^= 1, timeZoneList[timeZoneIndex]));
    }, 1000);
});

function time(showColon, zone) {
    const display = "    " + moment.tz(zone).format(
        showColon ? "h:mm" : "h mm"
    );
    return display.slice(-5);
}
