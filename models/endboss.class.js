class Endboss extends MovebaleObject {
    x = 1700;
    y = 240;
    width = 200;
    height = 200;
    IMAGES_WALKING = [
        "../assets/img/4_enemie_boss_chicken/1_walk/G1.png",
        "../assets/img/4_enemie_boss_chicken/1_walk/G2.png",
        "../assets/img/4_enemie_boss_chicken/1_walk/G3.png",
        "../assets/img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_ALERT = [
        "../assets/img/4_enemie_boss_chicken/2_alert/G5.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G6.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G7.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G8.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G9.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G10.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G11.png",
        "../assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];
    speed = 0.1;
    chickenSound = new Audio("../audio/chicken.mp3");
    audioVolume = 0.25;

    constructor() {
        super().loadImage(
            "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
        );
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.animate();
        this.moveLeft(this.speed);
        this.chickenSound.volume = this.audioVolume;
    }
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 2);
    }
}
