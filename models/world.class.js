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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.startGame();
    }

    startGame() {
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        });
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.addNewBottels();
            this.handleGameStatus();
        }, 1000 / 8);
    }

    checkWin() {
        return this.level.enemies.some((element) => element instanceof Endboss && element.isDead());
    }

    checkGameOver() {
        return this.character.isDead();
    }

    handleGameStatus() {
        if (this.checkGameOver()) {
            this.msg.y = 0;
            this.stopGame(760);
        } else if (this.checkWin()) {
            this.winMsg.y = 0;
            this.stopGame(1160);
        }
    }

    stopGame(time) {
        setTimeout(() => {
            this.clearAllIntervals();
            document.getElementById("play-btn").classList.remove("d-none");
        }, time);
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
        cancelAnimationFrame(window.animationFrameId);
    }

    addNewBottels() {
        if (this.level.throwableObjects.length === 0 && this.character.bottleBag === 0) {
            for (let i = 0; i <= 5; i++) {
                this.level.throwableObjects.push(new Bottle());
            }
        }
    }

    checkThrowObjects() {
        if (this.keyboard.THROW) {
            if (this.checkThrowAllowed()) {
                let bottle = new ThrowableObject(this.character.x + 130, this.character.y + 30);
                this.bottelbar.setPercentage(this.character.bottleBag - 1);
                this.character.bottleBag--;
                this.level.throwableObjects.push(bottle);
                this.removeObject(bottle);
            }
        }
    }

    checkThrowAllowed() {
        return this.character.bottleBag > 0 && this.level.throwableObjects.every((element) => !(element instanceof ThrowableObject));
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    if (this.character.y + this.character.height - enemy.y - enemy.height < -30 && !(enemy instanceof Endboss)) {
                        enemy.hit(this.character.damage);
                        if (enemy.isDead()) {
                            this.character.hasKilled = true;
                        }
                    } else {
                        this.character.hit(enemy.damage);
                        this.healthbar.setPercentage(this.character.energy);

                        if (!enemy.isDead()) {
                            this.character.hasKilled = false;
                        }
                    }
                }
            });
        }, 1000 / 60);

        this.level.throwableObjects.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.level.throwableObjects.splice(i, 1);
                this.character.collect(bottle);
                this.bottelbar.setPercentage(this.character.bottleBag);
            }
        });

        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.character.collect(coin);
            }
        });

        this.level.throwableObjects.forEach((bottle) => {
            let endboss = this.level.enemies[this.level.enemies.length - 1];
            if (bottle instanceof ThrowableObject && endboss.isColliding(bottle)) {
                bottle.hit(bottle.damage);
                endboss.hit(bottle.damage);
                this.endbossbar.setPercentage(endboss.energy);
            }
        });
    }

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
    }

    addAllElements() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
    }

    drawStatusBars() {
        this.addToMap(this.healthbar);
        this.addToMap(this.bottelbar);
        this.addToMap(this.endbossbar);
        this.addToMap(this.coinbar);
        this.addCoinCount();
    }

    addCoinCount() {
        this.ctx.font = "24px 'Boogaloo', sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.character.coins, this.coinbar.width, this.coinbar.y + 32);
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => this.addToMap(object));
    }

    addToMap(mo) {
        if (mo) {
            if (mo.otherDirection) {
                this.flipImage(mo);
            }
            mo.draw(this.ctx);
            mo.drawRectangle(this.ctx);
            if (mo.otherDirection) {
                this.resetflipImage(mo);
            }
        } else return;
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    resetflipImage(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    removeObject(object) {
        setInterval(() => {
            if (object.y > 380) {
                object.hit(object.damage);
                this.level.throwableObjects = this.level.throwableObjects.filter((obj) => obj !== object);
            }
        }, 1000 / 60);
        setInterval(() => {
            if (object.isDead()) {
                object.hit(object.damage);
                this.level.throwableObjects = this.level.throwableObjects.filter((obj) => obj !== object);
            }
        }, 1500);
    }
}
