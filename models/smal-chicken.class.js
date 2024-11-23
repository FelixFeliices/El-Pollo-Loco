class SmallChicken extends MovebaleObject {
    x = 1000 + Math.random() * (2000 - 400);

    y = 370;
    width = 60;
    height = 60;

    speed = 0.2 + Math.random() * 0.25;
    damage = 5;

    chickenSound = new Audio("./assets/audio/chicken.mp3");
    audioVolume = 0.25;

    IMAGES_WALKING = [
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    IMAGES_DEAD = [
        "./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png",
    ];

    constructor() {
        super().loadImage(
            "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png"
        );
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.moveLeft(this.speed);
        this.chickenSound.volume = this.audioVolume;
    }
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);

            if (this.isDead()) {
                super.handleDeath();
            }
        }, 1000 / 10);
    }
}
