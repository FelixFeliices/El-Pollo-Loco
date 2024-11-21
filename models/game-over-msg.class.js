class GameOverMsg extends MovebaleObject {
    GAME_OVER_MSGS = [
        "./assets/img/9_intro_outro_screens/game_over/game over!.png",
        "./assets/img/9_intro_outro_screens/game_over/game over.png",
        "./assets/img/9_intro_outro_screens/game_over/oh no you lost!.png",
    ];

    x = 0;
    y = 480;
    width = 720;
    height = 480;

    constructor() {
        super().loadImage("./assets/img/9_intro_outro_screens/game_over/oh no you lost!.png");
    }
}
