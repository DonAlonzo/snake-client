import Entity from './entity'

export default class Player extends Entity {

    constructor(startPosition, length, direction) {
        super();
        this.startPosition = startPosition;
        this.length = length;
        this.direction = direction;
    }

    onMessage(message) {
        if (message.origin == this.constructor.name) {
            console.log(message);
        }
    }

    onMouseDown(x, y) {
        this.sendGlobal({
            action: "click",
            x: x,
            y: y
        });
    }

    update(deltaTime) {
    }

    draw(graphics) {
    }

}