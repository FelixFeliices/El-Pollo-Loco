class ThrowableObject extends MovebaleObject {
    height = 80;
    width = 80;
    force = 35;
    gravity = 60;
    damage = 10;
    energy = this.damage;

    IMAGES_BOTTLE_ROTATE = [
        "./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_BOTTLE_SPLASH = [
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_BOTTLE_ROTATE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {
        this.applayGravity();
        setInterval(() => {
            this.handleThrow();
            this.handleAnimations();
        }, 100);
    }

    handleThrow() {
        this.x += this.force;
        this.y += 40;
    }

    handleAnimations() {
        if (this.isDead()) this.handleSplash();
        else this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
    }

    handleSplash() {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        this.x -= this.force - 10;
        this.y -= 45;
    }
}
