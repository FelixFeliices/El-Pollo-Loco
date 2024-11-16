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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
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
        }, 1000 / 8);
    }

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

    checkThrowObjects() {
        if (this.keyboard.THROW) {
            if (this.character.bottleBag > 0) {
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

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    if (
                        this.character.y +
                            this.character.height -
                            enemy.y -
                            enemy.height <
                        -30
                    ) {
                        enemy.hit(this.character.damage);
                    } else {
                        this.character.hit(enemy.damage);
                        this.healthbar.setPercentage(this.character.energy);
                    }
                }
            }, 1000 / 60);
        });

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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.level.clouds);
        this.addObjectsToMap(this.level.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthbar);
        this.addToMap(this.bottelbar);
        this.addToMap(this.endbossbar);
        this.addToMap(this.coinbar);
        this.addCoinCount();
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    addCoinCount() {
        this.ctx.font = "24px 'Boogaloo', sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(
            this.character.coins,
            this.coinbar.width,
            this.coinbar.y + 32
        );
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => this.addToMap(object));
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawRectangle(this.ctx);

        if (mo.otherDirection) {
            this.resetflipImage(mo);
        }
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
