class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    cloud = new Cloud();
    backgroundObjects = [
        new BackgroundObject("../assets/img/5_background/layers/air.png", 0),
        new BackgroundObject(
            "../assets/img/5_background/layers/3_third_layer/1.png",
            0
        ),
        new BackgroundObject(
            "../assets/img/5_background/layers/2_second_layer/1.png",
            0
        ),
        new BackgroundObject(
            "../assets/img/5_background/layers/1_first_layer/1.png",
            0
        ),
    ];

    ctx;
    canvas;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.cloud);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}