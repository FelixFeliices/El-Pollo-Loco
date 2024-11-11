class ThrowableObject extends MovebaleObject {
    height = 80;
    width = 80;
    force = 35;
    // acceleration = 6;
    gravity = 60;

    IMAGES_BOTTLE = [
        "../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "../assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];

    IMAGES_BOTTLE_ROTATE = [
        "../assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "../assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "../assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "../assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_BOTTLE_SPLASH = [
        "../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_BOTTLE_ROTATE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.playAnimation(this.IMAGES_BOTTLE_ROTATE);

        // this.x = 1000 * Math.random() + 100;
        // this.y = 60;
        this.x = x;
        this.y = y;
        this.throw();
        this.removeBottle();
    }

    throw() {
        this.applayGravity();
        setInterval(() => {
            this.x += this.force;
            this.y += 40;
            this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
            // this.removeBottle();
            console.log(this.y);
        }, 100);
    }

    removeBottle() {
        console.log(this.y);

        if (this.y < 800 && this instanceof ThrowableObject) {
            // this.world.level.throwableObjects.splice(
            //     this.world.level.throwableObjects.length - 1,
            //     1
            // );
            console.log("löschen");
        }
    }
}
