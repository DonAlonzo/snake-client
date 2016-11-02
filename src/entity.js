export default class Entity {

    constructor() {
        this.alive = true;
        this.drawOrder = 0;
    }

    kill() {
        this.alive = false;
    }

    update(deltaTime) {
    }

    draw(graphics) {
    }

    onMessage(message) {
    }

    onMouseDown(x, y) {
    }

    onMouseUp(x, y) {
    }

    onMouseMove(x, y) {
    }

    onKeyDown(event) {
    }

    onKeyUp(event) {
    }

}