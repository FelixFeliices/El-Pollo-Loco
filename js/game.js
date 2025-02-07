let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let portrait = window.matchMedia("(orientation: portrait)").matches;
let game;
let gameActive = false;
let backgroundAudio = [
    new Audio("./assets/audio/eagle-squawking-type-1.mp3"),
    new Audio("./assets/audio/eagle-squawking-type-2.mp3"),
    new Audio("./assets/audio/eagle-squawking-type-3.mp3"),
];
let backgroundMusic = new Audio("./assets/audio/bg-music-2.mp3");
/**
 * Initializes the game by setting up the canvas, game element, and checking orientation.
 */
function init() {
    canvas = document.getElementById("canvas");
    game = document.getElementById("game");

    checkOrientation(portrait);
    checkGameActive();
    checkMuteStatus();
    checkMobileMode();
    handleUIElements();
    window.addEventListener("resize", () => {
        portrait = window.innerHeight > window.innerWidth;
        checkOrientation(portrait);
    });
}

function handleUIElements() {
    document.getElementById("menü-btn").classList.add("d-none");
    document.getElementById("game-overlay").classList.remove("d-none");
    document.getElementById("play-btn").classList.remove("d-none");
    document.getElementById("help-bar").classList.remove("d-none");
}

/**
 * Checks if the device is mobile.
 * @returns {boolean} True if the device is mobile, false otherwise.
 */
function isMobile() {
    const regex =
        /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

/**
 * Displays mobile-specific buttons and hides screen buttons if the device is mobile.
 */
function checkMobileMode() {
    if (isMobile()) {
        document.getElementById("footer").classList.add("d-none");
        document
            .getElementById("legal-mobile-container")
            .classList.remove("d-none");
    }
    if (isMobile() && gameActive) {
        document
            .getElementById("mobile-action-btns")
            .classList.remove("d-none");
        document.getElementById("screen-btns").classList.add("d-none");
    }
}

/**
 * Initializes the game environment, hides the play button and help-bar, and starts the game.
 */
function gameInit() {
    gameActive = true;
    checkMobileMode();
    setLevel();
    hideUIElements();
    world = new World(canvas, keyboard);
}

/**
 * Checks the current mute status and updates the visibility of mute/unmute UI elements accordingly.
 */
function checkMuteStatus() {
    if (!getMuteStatus()) {
        document.getElementById("disable-mute").classList.add("d-none");
    } else if (getMuteStatus()) {
        document.getElementById("disable-mute").classList.remove("d-none");
        document.getElementById("enable-mute").classList.add("d-none");
    }
}

/**
 * Saves the mute status in localStorage.
 *
 * @param {string} status - The status to be saved, either "enable" to mute or "disable" to unmute.
 *                          If "enable", the mute status is set to "true".
 *                          If "disable", the mute status is set to "false".
 */
function saveMuteStatus(status) {
    if (status == "enable") {
        localStorage.setItem("isMuted", "true");
        document.getElementById("enable-mute").classList.toggle("d-none");
        document.getElementById("disable-mute").classList.toggle("d-none");
    } else if (status == "disable") {
        localStorage.setItem("isMuted", "false");
        document.getElementById("enable-mute").classList.toggle("d-none");
        document.getElementById("disable-mute").classList.toggle("d-none");
    }
}

/**
 * Retrieves the mute status from localStorage and parses it to a boolean.
 * @returns {boolean} The mute status (true for muted, false for unmuted).
 */
function getMuteStatus() {
    let muteStatus = localStorage.getItem("isMuted");
    return JSON.parse(muteStatus);
}

/**
 * Hides UI elements related to the game setup, such as the play button, overlay, and help-bar.
 */
function hideUIElements() {
    document.getElementById("game-btns").classList.add("d-none");
    // document.getElementById("play-btn").classList.add("d-none");
    // document.getElementById("menü-btn").classList.add("d-none");
    document.getElementById("game-overlay").classList.add("d-none");
    document.getElementById("canvas").classList.remove("d-none");
    document.getElementById("help-bar").classList.add("d-none");
}

function toogleDialog() {
    document.getElementById("legal-link").classList.toggle("active");
}

/**
 * Periodically checks if the game is active and shows/hides the canvas.
 */

function checkGameActive() {
    setInterval(() => {
        if (!gameActive) {
            document.getElementById("canvas").classList.add("d-none");
        } else {
            document.getElementById("canvas").classList.remove("d-none");
        }
    }, 1000 / 20);
}

/**
 * Adjusts the view based on the device orientation.
 * @param {boolean} isPortrait - True if the orientation is portrait.
 */
function checkOrientation(isPortrait) {
    portrait = isPortrait;

    if (portrait) {
        document.getElementById("turn-msg-overlay").classList.remove("hide");
    } else {
        document.getElementById("turn-msg-overlay").classList.add("hide");
    }
}

/**
 * Enables fullscreen mode for the game.
 */
function fullscreen() {
    let game = document.getElementById("game");
    if (game.requestFullscreen) {
        game.requestFullscreen();
    } else if (game.webkitRequestFullscreen) {
        game.webkitRequestFullscreen();
    } else if (game.msRequestFullscreen) {
        game.msRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode if it is active.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * Event listener for keydown events to set corresponding keyboard controls to true.
 * @param {KeyboardEvent} event - The keyboard event.
 */
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

/**
 * Event listener for keyup events to set corresponding keyboard controls to false.
 * @param {KeyboardEvent} event - The keyboard event.
 */
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

/**
 * Starts user action based on the button pressed.
 * @param {string} userAction - The action being performed (e.g., "left", "right").
 * @param {Event} event - The event object triggered by the action.
 */
function startUserAction(userAction, event) {
    event.preventDefault();

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
        keyboard.THROW = true;
    }
}

/**
 * Ends user action based on the button pressed.
 * @param {string} userAction - The action being performed (e.g., "left", "right").
 */

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
        keyboard.THROW = false;
    }
}
