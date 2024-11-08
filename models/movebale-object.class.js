class MovebaleObject {
    x = 120;
    y = 240;
    img;
    imgChache = [];
    currentImage = 0;
    speed;
    otherDirection = false;
    world;
    gravity = 0;
    force = 40;
    acceleration = 4.5;

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawRectangle(ctx) {
        if (
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Endboss
        ) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding(mo) {
        return (
            this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
        );
    }

    applayGravity(ground) {
        setInterval(() => {
            if (this.isAboveGround(ground) || this.gravity > 0) {
                this.y -= this.gravity;
                this.gravity -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 150;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgChache[path] = img;
        });
    }

    jump() {
        this.y = 105;
        this.gravity = this.force;
    }

    walkRight(speed) {
        this.x += speed;
        this.walkingSound.play();
        this.world.firstInteraction = true;
    }

    walkLeft(speed) {
        this.x -= speed;
        this.walkingSound.play();
        this.world.firstInteraction = true;
    }

    moveLeft(speed) {
        setInterval(() => {
            this.x -= speed;
        }, 1000 / 60);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgChache[path];
        this.currentImage++;
    }

    // checkDistanceEndboss() {
    //     setInterval(() => {
    //         if (this.character.toNear(this.level.enemies[3])) {
    //             console.log("zunah");
    //         }
    //     }, 1000 / 60);
    // }
}
