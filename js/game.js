let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

function fullscreen() {
    canvas.requestFullscreen();
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode === 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode === 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode === 38 || event.keyCode === 32) {
        keyboard.UP = true;
    }
    if (event.keyCode === 68) {
        keyboard.THROW = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode === 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode === 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode === 38 || event.keyCode === 32) {
        keyboard.UP = false;
    }
    if (event.keyCode === 68) {
        keyboard.THROW = false;
    }
    if (event.keyCode === 27) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
});
