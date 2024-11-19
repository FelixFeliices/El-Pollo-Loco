class MovebaleObject extends DrawableObject {
    world;

    gravity = 0;
    force = 40;
    acceleration = 4.5;

    baseY = this.y;

    speed;
    otherDirection = false;
    hasJumped = false;

    energy = 100;
    damage = 0;
    lastHit = 0;

    hasKilled = false;

    applayGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.gravity > 0) {
                this.y -= this.gravity;
                this.gravity -= this.acceleration;

                if (!this.isAboveGround()) {
                    this.y = this.baseY;
                    this.gravity = 0;
                }
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject && !this instanceof Bottle) {
            return false;
        } else {
            return this.y < this.baseY;
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

    resetKill() {
        if (this.isHurt) {
            this.hasKilled = false;
        } else {
            this.hasKilled = true;
        }
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

    toNear() {
        return (
            this.world.character.x + this.world.character.width - this.x > -300
        );
    }

    jump(jumpheight) {
        if (this.gravity === 0) {
            this.y = jumpheight;
            this.gravity = this.force;
        }
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

    slowAnimation(images) {
        if (
            !this.lastIdleFrame ||
            Date.now() - this.lastIdleFrame > 1000 / 10
        ) {
            this.playAnimation(images);
            this.lastIdleFrame = Date.now();
        }
    }
}
