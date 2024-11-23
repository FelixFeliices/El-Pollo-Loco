let level1;
let chickenAmount = 5;
let smallChickenAmount = 5;
let bottleAmount = 5;
let coinAmount = 10;

const backgroundData = [
    ["./assets/img/5_background/layers/air.png", -719],
    ["./assets/img/5_background/layers/3_third_layer/2.png", -719],
    ["./assets/img/5_background/layers/2_second_layer/2.png", -719],
    ["./assets/img/5_background/layers/1_first_layer/2.png", -719],

    ["./assets/img/5_background/layers/air.png", 0],
    ["./assets/img/5_background/layers/3_third_layer/1.png", 0],
    ["./assets/img/5_background/layers/2_second_layer/1.png", 0],
    ["./assets/img/5_background/layers/1_first_layer/1.png", 0],

    ["./assets/img/5_background/layers/air.png", 719],
    ["./assets/img/5_background/layers/3_third_layer/2.png", 719],
    ["./assets/img/5_background/layers/2_second_layer/2.png", 719],
    ["./assets/img/5_background/layers/1_first_layer/2.png", 719],

    ["./assets/img/5_background/layers/air.png", 719 * 2],
    ["./assets/img/5_background/layers/3_third_layer/1.png", 719 * 2],
    ["./assets/img/5_background/layers/2_second_layer/1.png", 719 * 2],
    ["./assets/img/5_background/layers/1_first_layer/1.png", 719 * 2],

    ["./assets/img/5_background/layers/air.png", 719 * 3],
    ["./assets/img/5_background/layers/3_third_layer/2.png", 719 * 3],
    ["./assets/img/5_background/layers/2_second_layer/2.png", 719 * 3],
    ["./assets/img/5_background/layers/1_first_layer/2.png", 719 * 3],

    ["./assets/img/5_background/layers/air.png", 719 * 4],
    ["./assets/img/5_background/layers/3_third_layer/1.png", 719 * 4],
    ["./assets/img/5_background/layers/2_second_layer/1.png", 719 * 4],
    ["./assets/img/5_background/layers/1_first_layer/1.png", 719 * 4],

    ["./assets/img/5_background/layers/air.png", 719 * 5],
    ["./assets/img/5_background/layers/3_third_layer/2.png", 719 * 5],
    ["./assets/img/5_background/layers/2_second_layer/2.png", 719 * 5],
    ["./assets/img/5_background/layers/1_first_layer/2.png", 719 * 5],
];

function generateElements(ElementClass, amount) {
    const elements = [];
    for (let i = 0; i < amount; i++) {
        elements.push(new ElementClass());
    }
    return elements;
}

function generateBackgroundObjects(data) {
    return data.map(
        ([image, position]) => new BackgroundObject(image, position)
    );
}

function setLevel() {
    level1 = new Level(
        [
            ...generateElements(Chicken, chickenAmount),
            ...generateElements(SmallChicken, smallChickenAmount),
            new Endboss(),
        ],
        [...generateElements(Bottle, bottleAmount)],
        [...generateElements(Coin, coinAmount)],
        new Cloud(),
        generateBackgroundObjects(backgroundData)
    );
}
