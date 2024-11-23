class Level {
    enemies;
    clouds;
    backgroundObjects;
    throwableObjects;
    coins;
    levelEndX = 700 * 5 + 150;

    constructor(enemies, throwableObjects, coins, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.throwableObjects = throwableObjects;
        this.coins = coins;
    }
}
