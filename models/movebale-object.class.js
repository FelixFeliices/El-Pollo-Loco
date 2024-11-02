class MovebaleObject {
    x = 120;
    y = 240;
    img;
    imgChache = [];
    currentImage = 0;
    speed;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgChache[path] = img;
        });
    }

    moveRight(speed) {
        setInterval(() => {
            this.x += speed;
        }, 1000 / 60);
    }

    moveLeft(speed) {
        setInterval(() => {
            this.x -= speed;
        }, 1000 / 60);
    }
}
