class MovebaleObject extends DrawableObject {
    speed;
    otherDirection = false;
    world;
    gravity = 0;
    force = 40;
    acceleration = 4.5;
    energy = 100;
    lastHit = 0;

    applayGravity(ground) {
        setInterval(() => {
            if (this.isAboveGround(ground) || this.gravity > 0) {
                this.y -= this.gravity;
                this.gravity -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
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

    hit() {
        this.energy -= 1;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;

        return timepassed < 2.5;
    }

    isDead() {
        if (this.energy <= 0) {
            return true;
        }
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
}
