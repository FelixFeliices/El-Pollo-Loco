let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let portrait = window.matchMedia("(orientation: portrait)").matches;
let orientationQuery = window.matchMedia("(orientation: portrait)");

orientationQuery.addEventListener("change", (e) => {
    checkOrientation(e.matches);
});

function checkOrientation(isPortrait) {
    portrait = isPortrait;

    if (portrait && window.innerWidth < 1024) {
        document.getElementById("turn-msg-overlay").classList.remove("hide");
    } else {
        document.getElementById("turn-msg-overlay").classList.add("hide");
    }
}

function fullscreen() {
    canvas.requestFullscreen();
    canvas.style.setProperty("background-image", "unset");
}

function closeFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    document.getElementById("play-btn").classList.add("d-none");
    document.getElementById("screen-btns").classList.remove("d-none");
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
