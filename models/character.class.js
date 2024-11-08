class Character extends MovebaleObject {
    width = 150;
    height = 280;
    y = 105;
    speed = 3.5;
    energy = 10000000000000000000;
    bottleBag = 6;

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

    IMAGES_HURT = [
        "../assets/img/2_character_pepe/4_hurt/H-41.png",
        "../assets/img/2_character_pepe/4_hurt/H-42.png",
        "../assets/img/2_character_pepe/4_hurt/H-43.png",
    ];

    IMAGES_DEAD = [
        "../assets/img/2_character_pepe/5_dead/D-51.png",
        "../assets/img/2_character_pepe/5_dead/D-52.png",
        "../assets/img/2_character_pepe/5_dead/D-53.png",
        "../assets/img/2_character_pepe/5_dead/D-54.png",
        "../assets/img/2_character_pepe/5_dead/D-55.png",
        "../assets/img/2_character_pepe/5_dead/D-56.png",
        "../assets/img/2_character_pepe/5_dead/D-57.png",
    ];

    walkingSound = new Audio("../audio/walk.mp3");

    constructor() {
        super().loadImage("../assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.applayGravity();
    }

    animate() {
        setInterval(() => {
            this.walkingSound.playbackRate = 1.5;
            this.walkingSound.pause();
            if (
                this.world.keyboard.RIGHT &&
                this.x < this.world.level.levelEndX &&
                !this.isDead()
            ) {
                this.walkRight(this.speed);
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > -100 && !this.isDead()) {
                this.walkLeft(this.speed);
                this.otherDirection = true;
            }

            if (
                this.world.keyboard.UP &&
                !this.isAboveGround() &&
                !this.isDead()
            ) {
                this.jump();
            }

            if (this.world.firstInteraction) {
                this.world.level.enemies[0].chickenSound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (
                (this.world.keyboard.RIGHT &&
                    !this.isDead() &&
                    !this.isHurt()) ||
                (this.world.keyboard.LEFT && !this.isDead() && !this.isHurt())
            ) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 1000 / 14);
    }
}
