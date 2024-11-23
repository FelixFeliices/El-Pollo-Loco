class DrawableObject {
    x = 120;
    y = 240;
    width = 100;
    height = 100;
    img;
    imgChache = [];
    currentImage = 0;
    offset = {
        LEFT: 5,
        RIGHT: 5,
        UP: 5,
        DOWN: 5,
    };

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawRectangle(ctx) {
        if (this instanceof Character || this instanceof Endboss) {
            ctx.beginPath();
            ctx.rect(
                this.x + this.offset.LEFT,
                this.y + this.offset.UP - this.offset.DOWN,
                this.width - this.offset.LEFT - this.offset.RIGHT,
                this.height - this.offset.UP
            );
            ctx.stroke();
        }
    }
}
