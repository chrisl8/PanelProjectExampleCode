// This requires a switch with hookups to positive and negative.
// It may be easier to just use the button code for most switches if all you
// need to know is if it is flipped to a certain direction or not.

const five = require("johnny-five"),
    board = new five.Board();

board.on("ready", function () {
    // NOTE: You cannot use the word 'switch' as a variable ;)
    const switchOne = new five.Switch(12);

    switchOne.on("open", function () {
        console.log('Switch One OPEN.');
    });

    switchOne.on("close", function () {
        console.log('Switch One CLOSED.');
    });
});
