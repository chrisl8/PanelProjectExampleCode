const five = require("johnny-five"),
    board = new five.Board();

// http://johnny-five.io/api/button/

board.on("ready", function () {

    // Create a new `button` hardware instance.
    const button = new five.Button({
        pin: 12,
        isPullup: true
    });

    button.on("hold", function () {
        console.log("Button held");
    });

    button.on("press", function () {
        console.log("Button pressed");
    });

    button.on("release", function () {
        // This will repeat ever 100ms, or however often set by 'holdtime' on button instance
        console.log("Button released");
    });
});
