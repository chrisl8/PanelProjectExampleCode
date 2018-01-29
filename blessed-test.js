// https://github.com/chjj/blessed
const blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
    smartCSR: true
});

screen.title = 'my window title';

const topBox = blessed.box({
    top: '0',
    left: '0',
    width: '100%',
    height: '10%',
    align: 'center',
    valign: 'middle',
    content: '{center}{bold}Top Box{/bold}{/center}',
    tags: true,
    // border: {
    //     type: 'line'
    // },
    style: {
        fg: 'white',
        bg: 'blue',
        // border: {
        //     fg: '#f0f0f0'
        // },
        // hover: {
        //     bg: 'green'
        // }
    }
});

const leftBox = blessed.text({
    top: '10%',
    left: '0',
    width: '50%',
    height: '90%',
    // content: 'Hello {bold}world{/bold}!',
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        bg: 'magenta',
        border: {
            fg: '#f0f0f0'
        },
        hover: {
            bg: 'green'
        }
    }
});

const rightBox = blessed.text({
    top: '10%',
    left: '50%',
    width: '50%',
    height: '90%',
    // content: 'Hello {bold}world{/bold}!',
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        bg: 'magenta',
        border: {
            fg: '#f0f0f0'
        },
        hover: {
            bg: 'green'
        }
    }
});

// Append our box to the screen.
screen.append(leftBox);
screen.append(rightBox);
screen.append(topBox);

// Add a png icon to the box
// var icon = blessed.image({
//   parent: box,
//   top: 0,
//   left: 0,
//   type: 'overlay',
//   width: 'shrink',
//   height: 'shrink',
//   file: __dirname + '/my-program-icon.png',
//   search: false
// });

// If our box is clicked, change the content.
leftBox.on('click', function (data) {
    leftBox.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
    screen.render();
});

// If box is focused, handle `enter`/`return` and give us some more content.
leftBox.key('enter', function (ch, key) {
    leftBox.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
    leftBox.setLine(1, 'bar');
    leftBox.insertLine(1, 'foo');
    screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

// Focus our element.
leftBox.focus();

// Render the screen.
screen.render();

console.log(leftBox.height);

let counter = 0;
let boxLineCount = 1; // Start at 1 - Be sure to test this!
const addALine = function () {
    setTimeout(() => {
        if (boxLineCount > leftBox.height - 2) { // -2 for borders
            leftBox.deleteTop();
        } else {
            boxLineCount++;
        }
        leftBox.pushLine(counter + ". Here is another line of text.");
        // box.pushLine("Height: " + box.height + " Width: " + box.width + " Lines: " + box.content.length);
        counter++;
        screen.render();
        addALine();
    }, 1000);
};

let counter2 = 0;
let boxLineCount2 = 1; // Start at 1 - Be sure to test this!
const addALineRight = function () {
    setTimeout(() => {
        if (boxLineCount2 > rightBox.height - 2) { // -2 for borders
            rightBox.deleteTop();
        } else {
            boxLineCount2++;
        }
        rightBox.pushLine(counter2 + ". Right side line.");
        // box.pushLine("Height: " + box.height + " Width: " + box.width + " Lines: " + box.content.length);
        counter2++;
        screen.render();
        addALineRight();
    }, 1500);
};

addALine();
addALineRight();
