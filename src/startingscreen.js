export default class StartingScreen {

    constructor(world) {
        this.world = world;
    }

    draw(graphics) {
        graphics.fillColor(1, 1, 1);
        graphics.fillText('You died you stupid.. sick.. white... white guilt.. ', 100, 100);
        graphics.fillText('To play again press any key', 100, 120);
    }

    onKeyDown(event) {
        if (!this.world.player.alive) {
            this.world.newGame();
        }
    }

}