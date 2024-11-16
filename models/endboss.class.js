class Endboss extends MovebaleObject {
    x = 1700;
    y = 140;
    baseY = this.y;
    width = 300;
    height = 300;

    offset = {
        LEFT: 2.5,
        RIGHT: 2.5,
        UP: 35,
        DOWN: 2.5,
    };

    damage = 90;

    chickenSound = new Audio("../audio/chicken.mp3");
    audioVolume = 0.25;

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

    IMAGES_HURT = [
        "../assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "../assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "../assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_DEAD = [
        "../assets/img/4_enemie_boss_chicken/5_dead/G24.png",
        "../assets/img/4_enemie_boss_chicken/5_dead/G25.png",
        "../assets/img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    constructor() {
        super().loadImage(
            "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
        );
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.applayGravity();

        this.chickenSound.volume = this.audioVolume;
    }

    animate() {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (!this.hasJumped) {
                    this.jump(140);
                    this.hasJumped = true;
                } else if (this.y >= this.baseY) {
                    this.hasJumped = false;
                }
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.toNear(this)) {
                this.playAnimation(this.IMAGES_ALERT);
                this.speed = 0;
                this.x -= this.speed;
            } else {
                this.playAnimation(this.IMAGES_WALKING);
                this.speed = 0.1;

                setInterval(() => {
                    if (this.x > 500) {
                        this.x -= this.speed;
                    }
                }, 1000 / 60);
            }
        }, 1000 / 2);
    }
}
