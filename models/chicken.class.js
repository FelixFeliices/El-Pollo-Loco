class Chicken extends MovebaleObject {
    x = 400 + Math.random() * 300;
    y = 370;
    width = 60;
    height = 60;

    offset = {
        LEFT: 2.5,
        RIGHT: 2.5,
        UP: 2.5,
        DOWN: 2.5,
    };

    chickenSound = new Audio("../assets/audio/chicken.mp3");
    audioVolume = 0.25;

    speed = 0.3 + Math.random() * 0.25;
    damage = 5;

    IMAGES_WALKING = [
        "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    IMAGES_DEAD = [
        "../assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    ];

    constructor() {
        super().loadImage(
            "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
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
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.y = -1000;
                }, 100);
            }
        }, 1000 / 10);
    }
}
