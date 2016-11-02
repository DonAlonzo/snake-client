import Entity from './entity'

export default class Player extends Entity {

    constructor(startPosition, length, direction) {
        super();
        this.startPosition = startPosition;
        this.length = length;
        this.direction = direction;
    }

    update(deltaTime) {
    }

    draw(graphics) {

    }

}