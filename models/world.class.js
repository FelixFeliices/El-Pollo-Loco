class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    firstInteraction = false;
    healthbar = new Healthbar();
    bottelbar = new Bottelbar();
    endbossbar = new EndbossBar();
    coinbar = new Coinbar();
    msg = new GameOverMsg();
    winMsg = new WinMsg();
    characterSounds = [];

    /**
     * Creates an instance of the World class.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is drawn.
     * @param {Keyboard} keyboard - The keyboard object to manage player input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.characterSounds = [
            this.character.walkingSound,
            this.character.jumpingSound,
            this.character.hurtSound,
            this.character.deathSound,
        ];
        this.startGame();
    }

    /**
     * Starts the game by drawing the initial game state, setting up the world, and starting the game loop.
     */
    startGame() {
        this.draw();
        this.setWorld();
        this.playAudio();
        this.run();
    }

    /**
     * Sets up the world by associating the character and enemies with the world instance.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        });
    }

    /**
     * Starts the main game loop with periodic checks and updates.
     */
    run() {
        this.checkCollisions();
        this.checkThrowObjects();
        this.addNewBottels();
        this.handleGameStatus();
        this.checkMuteStatus();
    }

    /**
     * Retrieves the mute status from localStorage and parses it to a boolean.
     * @returns {boolean} The mute status (true for muted, false for unmuted).
     */
    getMuteStatus() {
        let muteStatus = localStorage.getItem("isMuted");
        return JSON.parse(muteStatus);
    }

    /**
     * Checks the mute status and toggles sound accordingly.
     * Calls muteSound() if muted, and unMuteSound() if not muted.
     */
    checkMuteStatus() {
        if (this.getMuteStatus()) {
            this.muteSound();
        } else if (!this.getMuteStatus()) {
            this.unMuteSound();
        }
    }

    /**
     * Mutes all game sounds, including background audio, enemy sounds, throwable object sounds,
     * and character sounds.
     */
    muteSound() {
        backgroundAudio.forEach((bgAudio) => {
            bgAudio.muted = true;
        });
        this.level.enemies.forEach((enemy) => {
            enemy.chickenSound.muted = true;
        });
        this.level.throwableObjects.forEach((throwableObject) => {
            if (throwableObject instanceof ThrowableObject)
                throwableObject.splashSound.muted = true;
        });
        this.characterSounds.forEach((character) => {
            character.muted = true;
        });
        backgroundMusic.muted = true;
    }

    /**
     * Unmutes all game sounds, including background audio, enemy sounds, throwable object sounds,
     * and character sounds.
     */
    unMuteSound() {
        backgroundAudio.forEach((bgAudio) => {
            bgAudio.muted = false;
        });
        this.level.enemies.forEach((enemy) => {
            enemy.chickenSound.muted = false;
        });
        this.level.throwableObjects.forEach((throwableObject) => {
            if (throwableObject instanceof ThrowableObject)
                throwableObject.splashSound.muted = false;
        });
        this.characterSounds.forEach((characterSound) => {
            characterSound.muted = false;
        });
        backgroundMusic.muted = false;
    }

    /**
     * Plays background audio with random selection and interval.
     */
    playAudio() {
        let randomNumber = Math.round(Math.random() * 2);
        backgroundAudio[randomNumber].volume = 0.05;
        backgroundMusic.volume = 0.2;
        backgroundAudio[randomNumber].play();
        backgroundMusic.play();

        let randomInterval =
            Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
        setTimeout(() => this.playAudio(), randomInterval);
    }

    /**
     * Checks if the player has won by verifying if any endboss is dead.
     * @returns {boolean} True if the player has won, false otherwise.
     */
    checkWin() {
        return this.level.enemies.some(
            (element) => element instanceof Endboss && element.isDead()
        );
    }

    /**
     * Checks if the player is dead by verifying the character's health.
     * @returns {boolean} True if the player is dead, false otherwise.
     */
    checkGameOver() {
        return this.character.isDead();
    }

    /**
     * Handles the game status, displaying the win or game over message and stopping the game.
     */
    handleGameStatus() {
        if (this.checkGameOver()) {
            this.msg.y = 0;
            this.stopGame(760);
        } else if (this.checkWin()) {
            this.winMsg.y = 0;
            this.stopGame(1160);
        }
    }

    /**
     * Stops the game after a given timeout and shows the Menu button again.
     * @param {number} time - The time in milliseconds before stopping the game.
     */
    stopGame(time) {
        setTimeout(() => {
            this.clearAllIntervals();
            document.getElementById("game-btns").classList.remove("d-none");
            document.getElementById("play-btn").classList.remove("d-none");
            document.getElementById("menü-btn").classList.remove("d-none");
        }, time);
    }

    /**
     * Clears all active intervals and cancels the animation frame.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
        cancelAnimationFrame(window.animationFrameId);
    }

    /**
     * Adds new throwable bottles if the character has no bottles left.
     */
    addNewBottels() {
        if (
            this.level.throwableObjects.length === 0 &&
            this.character.bottleBag === 0
        ) {
            for (let i = 0; i <= 5; i++) {
                this.level.throwableObjects.push(new Bottle());
            }
        }
    }

    /**
     * Checks if the player is attempting to throw an object and processes the action.
     */
    checkThrowObjects() {
        if (this.keyboard.THROW) {
            if (this.checkThrowAllowed()) {
                let bottle = new ThrowableObject(
                    this.character.x + 130,
                    this.character.y + 30
                );
                this.bottelbar.setPercentage(this.character.bottleBag - 1);
                this.character.bottleBag--;
                this.level.throwableObjects.push(bottle);
                this.removeObject(bottle);
            }
        }
    }

    /**
     * Verifies if throwing a bottle is allowed (there are bottles available and no other thrown objects).
     * @returns {boolean} True if throwing is allowed, false otherwise.
     */
    checkThrowAllowed() {
        return (
            this.character.bottleBag > 0 &&
            this.level.throwableObjects.every(
                (element) => !(element instanceof ThrowableObject)
            )
        );
    }

    /**
     * Periodically checks for collisions between the character, enemies, throwable objects, coins, and the endboss.
     */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkThrowableObjectCollisions();
        this.checkCoinCollisions();
        this.checkEndbossCollisions();
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.handleCollision(enemy);
            }
        });
    }

    /**
     * Handles the collision between the character and an enemy.
     * @param {Enemy} enemy - The enemy that the character collides with.
     */
    handleCollision(enemy) {
        if (this.isFallingOnEnemy(enemy)) this.handleFallingOnEnemy(enemy);
        else this.handleDamageFromEnemy(enemy);
    }

    /**
     * Determines if the character is falling on an enemy.
     * @param {Enemy} enemy - The enemy being checked.
     * @returns {boolean} True if the character is falling on the enemy, false otherwise.
     */
    isFallingOnEnemy(enemy) {
        return this.character.gravity < 0 && !(enemy instanceof Endboss);
    }

    /**
     * Handles the case when the character falls on an enemy, dealing damage to the enemy.
     * @param {Enemy} enemy - The enemy that is being fallen on.
     */
    handleFallingOnEnemy(enemy) {
        enemy.hit(this.character.damage);
        if (enemy.isDead()) this.character.hasKilled = true;
    }

    /**
     * Handles the case when the character takes damage from an enemy.
     * @param {Enemy} enemy - The enemy dealing damage to the character.
     */
    handleDamageFromEnemy(enemy) {
        this.character.hit(enemy.damage);
        this.healthbar.setPercentage(this.character.energy);
        if (!enemy.isDead()) this.character.hasKilled = false;
    }

    /**
     * Checks for collisions between the character and throwable objects (e.g., bottles).
     */
    checkThrowableObjectCollisions() {
        this.level.throwableObjects.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.level.throwableObjects.splice(i, 1);
                this.character.collect(bottle);
                this.bottelbar.setPercentage(this.character.bottleBag);
            }
        });
    }

    /**
     * Checks for collisions between the character and coins.
     */
    checkCoinCollisions() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.character.collect(coin);
            }
        });
    }

    /**
     * Checks for collisions between throwable objects and the endboss.
     */
    checkEndbossCollisions() {
        this.level.throwableObjects.forEach((bottle) => {
            let endboss = this.level.enemies[this.level.enemies.length - 1];
            if (
                bottle instanceof ThrowableObject &&
                endboss.isColliding(bottle)
            ) {
                bottle.hit(bottle.damage);
                endboss.hit(bottle.damage);
                this.endbossbar.setPercentage(endboss.energy);
            }
        });
    }

    /**
     * Draws the game world, including the background, enemies, character, and status bars.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addAllElements();
        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars();
        this.addToMap(this.msg);
        this.addToMap(this.winMsg);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
        this.run();
    }

    /**
     * Adds all game elements (background, clouds, enemies, etc.) to the canvas.
     */
    addAllElements() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
    }

    /**
     * Draws the status bars (health, bottles, coins, etc.) on the canvas.
     */

    drawStatusBars() {
        this.addToMap(this.healthbar);
        this.addToMap(this.bottelbar);
        this.addToMap(this.endbossbar);
        this.addToMap(this.coinbar);
        this.addCoinCount();
    }

    /**
     * Draws the current coin count on the canvas.
     */
    addCoinCount() {
        this.ctx.font = "24px 'Boogaloo', sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(
            this.character.coins,
            this.coinbar.width,
            this.coinbar.y + 32
        );
    }

    /**
     * Adds a list of objects to the game world.
     * @param {Array} objects - An array of objects to be added to the world.
     */
    addObjectsToMap(objects) {
        objects.forEach((object) => this.addToMap(object));
    }

    /**
     * Adds a single object to the game world.
     * @param {Object} mo - The object to be added to the world.
     */
    addToMap(mo) {
        if (mo) {
            if (mo.otherDirection) {
                this.flipImage(mo);
            }
            mo.draw(this.ctx);
            if (mo.otherDirection) {
                this.resetflipImage(mo);
            }
        } else return;
    }

    /**
     * Flips an image horizontally to simulate a character facing the other direction.
     * @param {Object} mo - The object whose image will be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Resets the image flip to the original state after drawing.
     * @param {Object} mo - The object whose image flip will be reset.
     */
    resetflipImage(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    /**
     * Removes an object (e.g., a bottle) from the world when it goes off-screen or is no longer needed.
     * @param {Object} object - The object to be removed from the world.
     */
    removeObject(object) {
        setInterval(() => {
            if (object.y > 380) {
                object.hit(object.damage);
                this.level.throwableObjects =
                    this.level.throwableObjects.filter((obj) => obj !== object);
            }
        }, 1000 / 60);
        setInterval(() => {
            if (object.isDead()) {
                object.hit(object.damage);
                this.level.throwableObjects =
                    this.level.throwableObjects.filter((obj) => obj !== object);
            }
        }, 1500);
    }
}
