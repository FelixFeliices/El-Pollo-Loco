class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    firstInteraction = false;
    // indexOfEndboss;
    // distance;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkDistanceEndboss();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    console.log("coliedert");
                }
            });
        }, 1000 / 60);
    }

    checkDistanceEndboss() {
        setInterval(() => {
            console.log(this);

            if (this.level.enemies instanceof Endboss) {
                this.level.enemies.forEach((enemy) => {
                    if (this.character.toNear(enemy)) {
                        console.log("zunah");
                    }
                });
            }
        }, 1000 / 60);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);
        // this.checkDistance();
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

    // checkDistance() {
    //     this.indexOfEndboss = this.level.enemies.findIndex(
    //         (enemy) => enemy instanceof Endboss
    //     );

    //     this.endboss = this.level.enemies[this.indexOfEndboss];
    //     this.distance = this.endboss.x - this.character.x;

    //     if (this.distance < 450) {
    //         console.log("zu nah");
    //     }
    // }

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
