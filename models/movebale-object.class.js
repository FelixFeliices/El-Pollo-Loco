class MovebaleObject {
    x = 120;
    y = 240;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        onkeydown(39);
        console.log("Moving right");
    }

    moveLeft() {
        console.log("Moving left");
    }
}
