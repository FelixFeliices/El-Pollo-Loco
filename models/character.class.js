class Character extends MovebaleObject {
    width = 150;
    height = 280;
    y = 155;
    IMAGES_WALKING = [
        "../assets/img/2_character_pepe/2_walk/W-21.png",
        "../assets/img/2_character_pepe/2_walk/W-22.png",
        "../assets/img/2_character_pepe/2_walk/W-23.png",
        "../assets/img/2_character_pepe/2_walk/W-24.png",
        "../assets/img/2_character_pepe/2_walk/W-25.png",
        "../assets/img/2_character_pepe/2_walk/W-26.png",
    ];
    speed = 1;
    world;

    constructor() {
        super().loadImage("../assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imgChache[path];
                this.currentImage++;
            }
        }, 1000 / 13);
    }
}
