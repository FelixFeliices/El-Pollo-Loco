class StatusBar extends DrawableObject {
    percentage = 100;

    IMAGES_HEALTH_BAR = [
        "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_BAR);
        this.x = 0;
        this.y = 0;
        this.width = 180;
        this.height = 50;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH_BAR[this.resolveImageIndex(percentage)];
        this.img = this.imgChache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else if (this.percentage > 0) {
            return 0;
        } else if (this.percentage <= 0) {
            return 0;
        }
    }
}
