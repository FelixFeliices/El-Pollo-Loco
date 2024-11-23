class Character extends MovebaleObject {
    width = 150;
    height = 280;
    offset = {
        LEFT: 50,
        RIGHT: 50,
        UP: 140,
        DOWN: 5,
    };

    y = 155;
    baseY = this.y;
    // speed = 3.5;

    speed = 16.5;
    lastMove = new Date().getTime();

    bottleBag = 0;
    coins = 0;

    energy = 100;
    damage = 100;

    walkingSound = new Audio("./assets/audio/walk.mp3");
    hurtSound = new Audio("./assets/audio/hurt.mp3");
    deathSound = new Audio("./assets/audio/death.mp3");

    IMAGES_IDLE = [
        "./assets/img/2_character_pepe/1_idle/idle/I-1.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-2.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-3.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-4.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-5.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-6.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-7.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-8.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-9.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-10.png",
    ];
    IMAGES_LONG_IDLE = [
        "./assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    IMAGES_WALKING = [
        "./assets/img/2_character_pepe/2_walk/W-21.png",
        "./assets/img/2_character_pepe/2_walk/W-22.png",
        "./assets/img/2_character_pepe/2_walk/W-23.png",
        "./assets/img/2_character_pepe/2_walk/W-24.png",
        "./assets/img/2_character_pepe/2_walk/W-25.png",
        "./assets/img/2_character_pepe/2_walk/W-26.png",
    ];

    IMAGES_JUMPING = [
        "./assets/img/2_character_pepe/3_jump/J-31.png",
        "./assets/img/2_character_pepe/3_jump/J-32.png",
        "./assets/img/2_character_pepe/3_jump/J-33.png",
        "./assets/img/2_character_pepe/3_jump/J-34.png",
        "./assets/img/2_character_pepe/3_jump/J-35.png",
        "./assets/img/2_character_pepe/3_jump/J-36.png",
        "./assets/img/2_character_pepe/3_jump/J-37.png",
        "./assets/img/2_character_pepe/3_jump/J-38.png",
        "./assets/img/2_character_pepe/3_jump/J-39.png",
    ];

    IMAGES_HURT = [
        "./assets/img/2_character_pepe/4_hurt/H-41.png",
        "./assets/img/2_character_pepe/4_hurt/H-42.png",
        "./assets/img/2_character_pepe/4_hurt/H-43.png",
    ];

    IMAGES_DEAD = [
        "./assets/img/2_character_pepe/5_dead/D-51.png",
        "./assets/img/2_character_pepe/5_dead/D-52.png",
        "./assets/img/2_character_pepe/5_dead/D-53.png",
        "./assets/img/2_character_pepe/5_dead/D-54.png",
        "./assets/img/2_character_pepe/5_dead/D-55.png",
        "./assets/img/2_character_pepe/5_dead/D-56.png",
        "./assets/img/2_character_pepe/5_dead/D-57.png",
    ];

    constructor() {
        super().loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");

        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.applayGravity();
        this.hasPlayedHurt = false;
    }

    animate() {
        this.handleMovement();
        this.handleAnimations();
    }

    handleMovement() {
        setInterval(() => {
            this.walkingSound.playbackRate = 1.5;
            this.walkingSound.pause();

            if (!this.isDead()) {
                this.handleDirection();
                this.handleJump();
                this.handleInteraction();
                this.updateCameraPosition();
            }
        }, 1000 / 60);
    }

    handleDirection() {
        if (this.canMoveRigth()) this.handleMoveRight();
        if (this.canMoveLeft()) this.handleMoveLeft();
    }

    canMoveRigth() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX;
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -100;
    }

    handleMoveRight() {
        this.walkRight(this.speed);
        this.otherDirection = false;
        this.lastMove = new Date().getTime();
    }

    handleMoveLeft() {
        this.walkLeft(this.speed);
        this.otherDirection = true;
        this.lastMove = new Date().getTime();
    }

    handleJump() {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump(105);
            this.lastMove = new Date().getTime();
        }
    }

    handleInteraction() {
        if (this.world.firstInteraction) {
            this.world.level.enemies[0].chickenSound.play();
        }
    }

    updateCameraPosition() {
        this.world.camera_x = -this.x + 100;
    }

    handleAnimations() {
        setInterval(() => {
            if (this.isDead()) {
                this.playDeathAnimation();
            } else if (this.allowedToAnimateHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (!this.hasPlayedHurt) {
                    this.hurtSound.currentTime = 0.4;
                    this.hurtSound.play();
                    this.hasPlayedHurt = true;
                }
            } else if (this.isAboveGround())
                this.playAnimation(this.IMAGES_JUMPING);
            else if (this.allowedToAnimateWalking()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playIdleAnimation();
            }
        }, 1000 / 10);
    }

    playIdleAnimation() {
        if (this.getTired()) {
            this.slowAnimation(this.IMAGES_LONG_IDLE);
        } else {
            this.slowAnimation(this.IMAGES_IDLE);
        }
    }

    playDeathAnimation() {
        this.y += 20;
        this.playAnimation(this.IMAGES_DEAD);
        this.deathSound.volume = 0.5;
        this.deathSound.play();
    }

    allowedToAnimateHurt() {
        return this.isHurt() && !this.hasKilled;
    }

    allowedToAnimateWalking() {
        return (
            (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
            !this.isHurt() &&
            !this.isDead()
        );
    }

    getTired() {
        let timepassed = new Date().getTime() - this.lastMove;
        timepassed = timepassed / 1000;
        return timepassed > 4;
    }

    collect(item) {
        if (item instanceof Bottle) this.bottleBag++;
        if (item instanceof Coin) this.coins++;
    }
}
