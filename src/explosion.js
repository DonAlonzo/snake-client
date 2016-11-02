import Entity from './entity'

export default class Explosion extends Entity {

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.size = 0;
        this.speed = 0.05;
    }

    update(deltaTime) {
        this.size += this.speed * deltaTime;
        if (this.size > 100) {
            this.kill();
        }
    }

    draw(graphics) {
        graphics.drawCircle(this.x, this.y, this.size);
    }

}