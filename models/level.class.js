class Level {
    enemies;
    clouds;
    backgroundObjects;
    throwableObjects;
    levelEndX = 700 * 3;
    constructor(enemies, clouds, backgroundObjects, throwableObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.throwableObjects = throwableObjects;
    }
}
