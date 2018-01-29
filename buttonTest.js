const five = require("johnny-five"),
    board = new five.Board();

// http://johnny-five.io/api/button/

board.on("ready", function () {

    // Create a new `button` hardware instance.
    const button1 = new five.Button({
        pin: 8,
        isPullup: true
    });

    const button2 = new five.Button({
        pin: 9,
        isPullup: true
    });

    button1.on("hold", function () {
        console.log("Button 1 held");
    });

    button1.on("press", function () {
        console.log("Button 1 pressed");
    });

    button1.on("release", function () {
        // This will repeat ever 100ms, or however often set by 'holdtime' on button instance
        console.log("Button 1 released");
    });


    button2.on("hold", function () {
        console.log("Button 2 held");
    });

    button2.on("press", function () {
        console.log("Button 2 pressed");
    });

    button2.on("release", function () {
        // This will repeat ever 100ms, or however often set by 'holdtime' on button instance
        console.log("Button 2 released");
    });
});
