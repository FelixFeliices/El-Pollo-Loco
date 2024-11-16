class Bottelbar extends StatusBar {
    y = 50;
    IMAGES_BOTTLE_AMOUNT = [
        "../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
        "../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
        "../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE_AMOUNT);
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE_AMOUNT[percentage];
        this.img = this.imgChache[path];
    }
}
