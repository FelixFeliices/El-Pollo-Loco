class Chicken extends MovebaleObject {
    x = 400 + Math.random() * 300;
    y = 365;
    width = 60;
    height = 60;

    constructor() {
        super().loadImage(
            "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
        );
    }
}
