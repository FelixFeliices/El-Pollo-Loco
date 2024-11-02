class MovebaleObject {
    x = 120;
    y = 240;
    img;
    imgChache = [];

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

    moveRight() {
        onkeydown(39);
        console.log("Moving right");
    }

    moveLeft() {
        console.log("Moving left");
    }
}
