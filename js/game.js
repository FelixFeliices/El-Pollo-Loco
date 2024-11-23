let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let portrait = window.matchMedia("(orientation: portrait)").matches;
let game;
let gameActive = false;

checkFullScreen();

function init() {
    canvas = document.getElementById("canvas");
    game = document.getElementById("game");
    checkOrientation(portrait);
    checkFullScreen();

    if (isMobile()) {
        document.querySelector("h1").classList.add("d-none");
    }

    window.addEventListener("resize", () => {
        portrait = window.innerHeight > window.innerWidth;
        checkOrientation(portrait);
    });
}

function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

function checkMobileMode() {
    if (isMobile()) {
        document.getElementById("mobile-action-btns").classList.remove("d-none");
        document.getElementById("screen-btns").classList.add("d-none");
    }
}

async function gameInit() {
    document.getElementById("play-btn").classList.add("d-none");
    document.getElementById("game-overlay").classList.add("d-none");
    document.getElementById("canvas").classList.remove("d-none");
    checkMobileMode();
    setLevel();
    world = new World(canvas, keyboard);
    gameActive = true;
}

function checkFullScreen() {
    setInterval(() => {
        if (document.fullscreenElement) {
            document.getElementById("open-fullscreen-btn").classList.add("d-none");
            document.getElementById("close-fullscreen-btn").classList.remove("d-none");
            document.getElementById("play-btn").style.top = "280px";
            document.getElementById("play-btn").style.scale = "2";
            if (!gameActive) {
                document.getElementById("canvas").classList.add("d-none");
            } else {
                document.getElementById("canvas").classList.remove("d-none");
            }
        } else {
            document.getElementById("open-fullscreen-btn").classList.remove("d-none");
            document.getElementById("close-fullscreen-btn").classList.add("d-none");
            document.getElementById("play-btn").style.top = "16px";
            document.getElementById("play-btn").style.scale = "1";
        }
    }, 1000 / 20);
}

function checkOrientation(isPortrait) {
    portrait = isPortrait;

    if (portrait) {
        document.getElementById("turn-msg-overlay").classList.remove("hide");
    } else {
        document.getElementById("turn-msg-overlay").classList.add("hide");
    }
}

function fullscreen() {
    game.requestFullscreen();
}

function closeFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
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

function startUserAction(userAction) {
    document.getElementById(userAction + "-btn").style.scale = "1.1";
    if (userAction == "left") {
        keyboard.LEFT = true;
    }
    if (userAction == "right") {
        keyboard.RIGHT = true;
    }
    if (userAction == "jump") {
        keyboard.UP = true;
    }
    if (userAction == "throw") {
        keyboard.TROW = true;
    }
}

function endUserAction(userAction) {
    document.getElementById(userAction + "-btn").style.scale = "1";
    if (userAction == "left") {
        keyboard.LEFT = false;
    }
    if (userAction == "right") {
        keyboard.RIGHT = false;
    }
    if (userAction == "jump") {
        keyboard.UP = false;
    }
    if (userAction == "throw") {
        keyboard.TROW = false;
    }
}
