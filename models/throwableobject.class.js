class ThrowableObject extends MovebaleObject {
    height = 80;
    width = 80;
    force = 20;
    gravity = 20;
    acceleration = 3;
    damage = 30;
    energy = this.damage;
    hasSplashed = false;

    splashSound = new Audio("./assets/audio/bottle-break.mp3");

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

    /**
     * Constructs a throwable object.
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     */
    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_BOTTLE_ROTATE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
        this.x = x;
        this.y = y;
        this.throw();
    }

    /**
     * Initiates the throw action, applying gravity and setting up animations.
     */
    throw() {
        this.applayGravity();
        setInterval(() => {
            this.handleThrow();
            this.handleAnimations();
        }, 1000 / 15);
    }

    /**
     * Handles the object's position update during a throw.
     */
    handleThrow() {
        this.x += this.force;
    }

    /**
     * Handles animations during the throw or upon splash.
     */
    handleAnimations() {
        if (this.isDead() && !this.hasSplashed) {
            this.handleSplash();
        } else {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
        }
    }

    /**
     * Executes splash logic, including animation and sound effects.
     */
    handleSplash() {
        this.hasSplashed = true;
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        this.handleSplashSound();
    }

    /**
     * Plays the splash sound effect.
     */
    handleSplashSound() {
        this.splashSound.currentTime = 0.4;
        this.splashSound.play();
    }
}
