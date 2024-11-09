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
            this.checkCollectBottle();
            this.checkThrowObjects();
            this.addNewBottels();
        }, 1000 / 8);
    }

    addNewBottels() {
        setInterval(() => {
            if (this.level.throwableObjects.length == 0) {
                this.level.throwableObjects.push(new Bottle());
                this.level.throwableObjects.push(new Bottle());
                this.level.throwableObjects.push(new Bottle());
            }
        }, 1000);
    }

    checkCollectBottle() {
        this.level.throwableObjects.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.character.bottleBag++;
                this.level.throwableObjects.splice(i, 1);

                // this.character.hit();
                this.bottelbar.setPercentage(this.character.bottleBag);
                console.log(this.bottelbar);
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.THROW) {
            if (this.character.bottleBag >= 1) {
                let bottle = new ThrowableObject(
                    this.character.x + 80,
                    this.character.y + 150
                );

                this.character.bottleBag--;
                if (this.character.bottleBag == 0) {
                    this.character.bottleBag = 0;
                }

                this.level.throwableObjects.push(bottle);
                console.log(this.character.bottleBag);
            }
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthbar.setPercentage(this.character.energy);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.level.clouds);
        this.addObjectsToMap(this.level.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthbar);
        this.addToMap(this.bottelbar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => this.addToMap(object));
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawRectangle(this.ctx);

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
}
