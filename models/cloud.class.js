class Cloud extends MovebaleObject {
    y = 10;
    x = 0;
    width = 780;
    height = 300;

    constructor() {
        super().loadImage("../assets/img/5_background/layers/4_clouds/1.png");
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.02;
        }, 1);
    }
}
