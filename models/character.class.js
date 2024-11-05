class Character extends MovebaleObject {
    width = 150;
    height = 280;
    y = 105;
    speed = 3.5;
    world;

    IMAGES_WALKING = [
        "../assets/img/2_character_pepe/2_walk/W-21.png",
        "../assets/img/2_character_pepe/2_walk/W-22.png",
        "../assets/img/2_character_pepe/2_walk/W-23.png",
        "../assets/img/2_character_pepe/2_walk/W-24.png",
        "../assets/img/2_character_pepe/2_walk/W-25.png",
        "../assets/img/2_character_pepe/2_walk/W-26.png",
    ];

    IMAGES_JUMPING = [
        "../assets/img/2_character_pepe/3_jump/J-31.png",
        "../assets/img/2_character_pepe/3_jump/J-32.png",
        "../assets/img/2_character_pepe/3_jump/J-33.png",
        "../assets/img/2_character_pepe/3_jump/J-34.png",
        "../assets/img/2_character_pepe/3_jump/J-35.png",
        "../assets/img/2_character_pepe/3_jump/J-36.png",
        "../assets/img/2_character_pepe/3_jump/J-37.png",
        "../assets/img/2_character_pepe/3_jump/J-38.png",
        "../assets/img/2_character_pepe/3_jump/J-39.png",
    ];

    walkingSound = new Audio("../audio/walk.mp3");

    constructor() {
        super().loadImage("../assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.animate();
        this.applayGravity();
    }

    animate() {
        setInterval(() => {
            this.walkingSound.playbackRate = 1.5;
            this.walkingSound.pause();
            if (
                this.world.keyboard.RIGHT &&
                this.x < this.world.level.levelEndX
            ) {
                this.walkRight(this.speed);
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > -100) {
                this.walkLeft(this.speed);
                this.otherDirection = true;
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }

            if (this.world.firstInteraction) {
                this.world.level.enemies[0].chickenSound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 13);
    }
}
