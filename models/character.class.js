class Character extends MovebaleObject {
    width = 150;
    height = 280;
    y = 155;
    IMAGES_WALKING = [
        "../assets/img/2_character_pepe/2_walk/W-21.png",
        "../assets/img/2_character_pepe/2_walk/W-22.png",
        "../assets/img/2_character_pepe/2_walk/W-23.png",
        "../assets/img/2_character_pepe/2_walk/W-24.png",
        "../assets/img/2_character_pepe/2_walk/W-25.png",
        "../assets/img/2_character_pepe/2_walk/W-26.png",
    ];
    speed = 3.5;
    world;
    walkingSound = new Audio("../audio/walk.mp3");

    constructor() {
        super().loadImage("../assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walkingSound.playbackRate = 1.5;
            this.walkingSound.pause();
            if (
                this.world.keyboard.RIGHT &&
                this.x < this.world.level.levelEndX
            ) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walkingSound.play();
            }
            if (this.world.keyboard.LEFT && this.x > -100) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walkingSound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imgChache[path];
                this.currentImage++;
            }
        }, 1000 / 13);
    }
}
