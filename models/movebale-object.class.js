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

    jump() {
        this.y = 105;
        this.gravity = this.force;
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

    checkDistance() {
        console.log(this.x);
    }
}
