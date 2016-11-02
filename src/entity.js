export default class Entity {

    constructor() {
        this.alive = true;
    }

    kill() {
        this.alive = false;
    }

    update(deltaTime) {
    }

    draw(graphics) {
    }

}