class MovebaleObject extends DrawableObject {
    speed;
    otherDirection = false;
    world;
    gravity = 0;
    force = 40;
    acceleration = 4.5;
    energy = 100;
    damage = 0;
    lastHit = 0;
    baseY = this.y;
    hasJumped = false;

    // applayGravity() {
    //     setInterval(() => {
    //         if (this.isAboveGround() || this.gravity > 0) {
    //             this.y -= this.gravity;
    //             this.gravity -= this.acceleration;
    //         }
    //     }, 1000 / 25);
    // }

    applayGravity(baseY) {
        setInterval(() => {
            if (this.isAboveGround(baseY) || this.gravity > 0) {
                this.y -= this.gravity;
                this.gravity -= this.acceleration;

                if (!this.isAboveGround(baseY)) {
                    this.y = baseY;
                    this.gravity = 0;
                }
            }
        }, 1000 / 25);
    }

    isAboveGround(baseY) {
        if (this instanceof ThrowableObject && !this instanceof Bottle) {
            return false;
        } else {
            return this.y < baseY;
        }
    }

    isColliding(mo) {
        return (
            this.x - this.offset.LEFT + this.width > mo.x &&
            this.y + this.height + this.offset.UP > mo.y &&
            this.x - this.offset.LEFT < mo.x + mo.width &&
            this.y + this.offset.UP < mo.y + mo.height &&
            !this.isHurt()
        );
    }

    hit(damage) {
        if (!this.isHurt()) {
            this.energy -= damage;
            if (this.energy <= 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;

        return timepassed < 1.25;
    }

    isDead() {
        if (this.energy <= 0) {
            return true;
        }
    }

    toNear(mo) {
        return (
            this.world.character.x + this.world.character.width - mo.x > -300
        );
    }
    // IF statment mit gravity

    jump(jumpheight) {
        this.y = jumpheight;
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
