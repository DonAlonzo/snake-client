import Entity from './entity'
import Point from './point'

export default class Player extends Entity {

    constructor(x, y) {
        super();
        this.startPosition = new Point(x, y);
        this.drawOrder = 1000;
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
        graphics.fillColor(0, 0, 0, 1);
        graphics.fillText("Player", this.startPosition.x, this.startPosition.y);
    }

}