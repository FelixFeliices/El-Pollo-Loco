class Level {
    enemies;
    clouds;
    backgroundObjects;
    throwableObjects;
    coins;
    levelEndX = 700 * 3;
    constructor(enemies, clouds, backgroundObjects, throwableObjects, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.throwableObjects = throwableObjects;
        this.coins = coins;
    }
}
