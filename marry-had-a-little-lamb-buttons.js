// To play Mary Had  Little Lamb:
// http://www.true-piano-lessons.com/mary-had-a-little-lamb.html
// E D C D E E E
// D D D E G G
// E D C D E E E(Repeat first line)
// E D D E D C

// http://johnny-five.io/examples/led-digits-clock-HT16K33/
// http://johnny-five.io/api/led.digits/

const five = require("johnny-five");
const { spawn } = require('child_process');

// https://freesound.org/people/pinkyfinger/packs/4409/
const pianoNotes = {
    c: "68441__pinkyfinger__piano-c.wav",
    e: "68443__pinkyfinger__piano-e.wav",
    d: "68442__pinkyfinger__piano-d.wav",
    g: "68448__pinkyfinger__piano-g.wav"
};

const songArray = ['e', 'd', 'c', 'd', 'e', 'e', 'e', 'd', 'd', 'd', 'e', 'g', 'g', 'e', 'd', 'c', 'd', 'e', 'e', 'e', 'e', 'd', 'd', 'e', 'd', 'c',];

const board = new five.Board();

board.on("ready", function () {
    // Spawning out aplay on the Raspberry Pi 3 is instantaneous! So it seems to work great for playing sounds with buttons.
    // It even has no trouble overlapping notes.

    const keyButtonC = new five.Button({
        pin: 7,
        isPullup: true,
    });
    keyButtonC.on("press", function () {
        spawn("aplay", [`sounds/${pianoNotes.c}`]);
        console.log("C");
    });

    const keyButtonD = new five.Button({
        pin: 6,
        isPullup: true,
    });
    keyButtonD.on("press", function () {
        spawn("aplay", [`sounds/${pianoNotes.d}`]);
        console.log("D");
    });

    const keyButtonE = new five.Button({
        pin: 5,
        isPullup: true,
    });
    keyButtonE.on("press", function () {
        spawn("aplay", [`sounds/${pianoNotes.e}`]);
        console.log("E");
    });

    const keyButtonG = new five.Button({
        pin: 4,
        isPullup: true,
    });
    keyButtonG.on("press", function () {
        spawn("aplay", [`sounds/${pianoNotes.g}`]);
        console.log("G");
    });

    const playSongButton = new five.Button({
        pin: 8,
        isPullup: true,
    });
    let note = 0;
    playSongButton.on("press", function () {
        console.log(`sounds/${pianoNotes[songArray[note]]}`);
        spawn("aplay", [`sounds/${pianoNotes[songArray[note]]}`]);
        note++;
        if (note > songArray.length - 1) {
            note = 0;
        }
    })
});
