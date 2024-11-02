let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode === 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode === 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode === 38) {
        keyboard.UP = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode === 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode === 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode === 38) {
        keyboard.UP = false;
    }
});
