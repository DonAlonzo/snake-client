import Player from './player';
import World from './world';

class Main {

    constructor() {
        this.player = new Player();
        this.world = new World();

        this.world.addEntity(this.player);
    }

    start() {
        this.timer = setInterval(() => { this.update(); }, 10);
    }

    update() {
        this.world.update();
    }

    stop() {
        clearInterval(timer);
    }

}

var main = new Main();
main.start();