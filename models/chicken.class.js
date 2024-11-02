class Chicken extends MovebaleObject {
    x = 400 + Math.random() * 300;
    y = 365;
    width = 60;
    height = 60;
    IMAGES_WALKING = [
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];
    speed = 0.3 + Math.random() * 0.25;
    // chickenSound = new Audio("../audio/chicken.mp3");
    //     chickenSound.play();

    constructor() {
        super().loadImage(
            "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
        );
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.moveLeft(this.speed);
    }
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imgChache[path];
            this.currentImage++;
        }, 1000 / 10);
    }
}
