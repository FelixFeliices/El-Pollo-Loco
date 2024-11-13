class EndbossBar extends StatusBar {
    IMAGES_ENDBOSS_BAR = [
        "../assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "../assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "../assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "../assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "../assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
        "../assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSS_BAR);
        this.x = 520;
        this.y = 0;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSS_BAR[this.resolveImageIndex(percentage)];
        this.img = this.imgChache[path];
    }
}
